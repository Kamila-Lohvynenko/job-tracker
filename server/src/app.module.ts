import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ApplicationModule } from './application/application.module.js';
import { AuthModule } from './auth/auth.module.js';
import { EmailModule } from './email/email.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { VerificationModule } from './verification/verification.module.js';
import { ApplicationEventModule } from './application-event/application-event.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailModule,
    VerificationModule,
    UserModule,
    ApplicationModule,
    ApplicationEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
