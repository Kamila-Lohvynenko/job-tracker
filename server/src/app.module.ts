import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { EmailModule } from './email/email.module.js';
import { VerificationModule } from './verification/verification.module.js';

@Module({
  imports: [PrismaModule, AuthModule, EmailModule, VerificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
