import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VerificationCodeType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { generateVerificationCode } from '../utils/generate-verification-code.js';

@Injectable()
export class VerificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createEmailVerificationCode(userId: string): Promise<string> {
    const code = generateVerificationCode();
    const codeHash = await bcrypt.hash(code, 10);

    await this.prismaService.verificationCode.create({
      data: {
        userId,
        codeHash,
        type: VerificationCodeType.EMAIL_VERIFICATION,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return code;
  }

  async verifyCode(
    userEmail: string,
    code: string,
    type: VerificationCodeType,
  ): Promise<void> {
    const verificationCodes =
      await this.prismaService.verificationCode.findMany({
        where: {
          user: {
            email: userEmail,
          },
          type,
          usedAt: null,
          expiresAt: {
            gt: new Date(),
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    for (const verificationCode of verificationCodes) {
      const isValid = await bcrypt.compare(code, verificationCode.codeHash);

      if (isValid) {
        await this.prismaService.verificationCode.update({
          where: { id: verificationCode.id },
          data: { usedAt: new Date() },
        });

        return;
      }
    }

    throw new UnauthorizedException('Invalid or expired verification code');
  }
}
