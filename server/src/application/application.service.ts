import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ApplicationQueryDto,
  PrismaOrder,
} from './dto/application-query.dto.js';
import {
  ApplicationResponseDto,
  ApplicationsResponseDto,
} from './dto/application-response.dto.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';

@Injectable()
export class ApplicationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getApplications(
    userId: string,
    query: ApplicationQueryDto,
  ): Promise<ApplicationsResponseDto> {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const where: Prisma.ApplicationWhereInput = {
      userId,
      ...(query.status && { status: query.status }),
      ...(query.source && { source: query.source }),
      ...(query.employmentType && { employmentType: query.employmentType }),
      ...(query.search && {
        OR: [
          { company: { contains: query.search, mode: 'insensitive' } },
          { role: { contains: query.search, mode: 'insensitive' } },
        ],
      }),
      ...((query.appliedFrom || query.appliedTo) && {
        appliedAt: {
          ...(query.appliedFrom && { gte: new Date(query.appliedFrom) }),
          ...(query.appliedTo && { lte: new Date(query.appliedTo) }),
        },
      }),
    };

    const applications = await this.prismaService.application.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        appliedAt: query.order || PrismaOrder.DESC,
      },
    });

    const total = await this.prismaService.application.count({
      where,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      items: applications,
      page,
      limit,
      totalPages,
      totalItems: total,
    };
  }

  async getApplication(
    userId: string,
    applicationId: string,
  ): Promise<ApplicationResponseDto> {
    const application = await this.prismaService.application.findUnique({
      where: { id: applicationId, userId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async createApplication(
    userId: string,
    data: CreateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const application = await this.prismaService.application.create({
      data: {
        ...data,
        userId,
      },
    });

    return application;
  }

  async updateApplication(
    userId: string,
    applicationId: string,
    data: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const application = await this.prismaService.application.update({
      where: { id: applicationId, userId },
      data,
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async deleteApplication(
    userId: string,
    applicationId: string,
  ): Promise<ApplicationResponseDto> {
    const application = await this.prismaService.application.delete({
      where: { id: applicationId, userId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }
}
