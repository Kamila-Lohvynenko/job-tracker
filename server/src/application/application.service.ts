import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import {
  ApplicationEventStatus,
  ApplicationEventType,
  ApplicationStatus,
} from '../../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ApplicationQueryDto,
  PrismaOrder,
} from './dto/application-query.dto.js';
import {
  ApplicationResponseDto,
  ApplicationSummaryResponseDto,
  ApplicationsResponseDto,
} from './dto/application-response.dto.js';
import { ApplicationSummaryQueryDto } from './dto/application-summary-query.dto.js';
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
      ...(query.status?.length && { status: { in: query.status } }),
      ...(query.source && { source: query.source }),
      ...(query.employmentType && { employmentType: query.employmentType }),
      ...(query.location && { location: query.location }),
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

  async getApplicationsSummary(
    userId: string,
    query: ApplicationSummaryQueryDto,
  ): Promise<ApplicationSummaryResponseDto> {
    const appliedAt =
      query.appliedFrom || query.appliedTo
        ? {
            ...(query.appliedFrom && { gte: new Date(query.appliedFrom) }),
            ...(query.appliedTo && { lte: new Date(query.appliedTo) }),
          }
        : undefined;

    const [grouped, appliedInRange] = await Promise.all([
      this.prismaService.application.groupBy({
        by: ['status'],
        where: { userId },
        _count: { _all: true },
      }),
      appliedAt
        ? this.prismaService.application.count({
            where: { userId, appliedAt },
          })
        : Promise.resolve(0),
    ]);

    const byStatus: Record<ApplicationStatus, number> = {
      [ApplicationStatus.WISHLIST]: 0,
      [ApplicationStatus.APPLIED]: 0,
      [ApplicationStatus.HR_SCREEN]: 0,
      [ApplicationStatus.INTERVIEW]: 0,
      [ApplicationStatus.TAKE_HOME]: 0,
      [ApplicationStatus.OFFER]: 0,
      [ApplicationStatus.REJECTED]: 0,
      [ApplicationStatus.WITHDRAWN]: 0,
    };

    for (const row of grouped) {
      byStatus[row.status] = row._count._all;
    }

    return { byStatus, appliedInRange };
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
    const status = data.status ?? ApplicationStatus.APPLIED;

    return this.prismaService.$transaction(async (tx) => {
      const application = await tx.application.create({
        data: {
          ...data,
          userId,
          status,
        },
      });

      if (status !== ApplicationStatus.WISHLIST) {
        await tx.applicationEvent.create({
          data: {
            userId,
            applicationId: application.id,
            type: ApplicationEventType.APPLICATION_SUBMITTED,
            status: ApplicationEventStatus.COMPLETED,
            title: 'Application',
            eventDate: new Date(data.appliedAt),
          },
        });
      }

      return application;
    });
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
    const application = await this.prismaService.application.findUnique({
      where: { id: applicationId, userId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    await this.prismaService.application.delete({
      where: { id: applicationId, userId },
    });

    return application;
  }
}
