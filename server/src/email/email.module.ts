import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service.js';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const host = process.env.SMTP_HOST;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASSWORD;
        const from = process.env.SMTP_FROM;
        const port = Number(process.env.SMTP_PORT) || 587;

        if (!host || !user || !pass || !from) {
          throw new Error('SMTP env variables are not set');
        }

        return {
          transport: {
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          },
          defaults: {
            from: `"No Reply" <${from}>`,
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
