import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VerificationCodeType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { VerificationService } from '../verification/verification.service.js';
import { SigninDto } from './dto/signin.dto.js';
import { SignupDto, SignupResponseDto } from './dto/signup.dto.js';
import {
  ResendVerificationCodeDto,
  ResendVerificationCodeResponseDto,
  VerifyEmailDto,
} from './dto/verify-email.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly verificationService: VerificationService,
    private readonly emailService: EmailService,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupResponseDto> {
    const { name, email, password } = signupDto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: { name, email, passwordHash: hashedPassword },
    });

    const code = await this.verificationService.createEmailVerificationCode(
      user.id,
    );

    await this.emailService.sendVerificationEmail(user.email, code);

    return {
      message: 'Signup successful! Please verify your email within 10 minutes.',
    };
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { email, password } = signinDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new HttpException(
        'Please verify your email before logging in',
        403,
      );
    }

    const isPasswordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken({ id: user.id });
  }

  async verifyEmail(body: VerifyEmailDto): Promise<{ accessToken: string }> {
    await this.verificationService.verifyCode(
      body.email,
      body.code,
      VerificationCodeType.EMAIL_VERIFICATION,
    );

    const updatedUser = await this.prismaService.user.update({
      where: { email: body.email },
      data: { isEmailVerified: true },
    });

    return this.generateToken({ id: updatedUser.id });
  }

  async resendVerificationCode(
    body: ResendVerificationCodeDto,
  ): Promise<ResendVerificationCodeResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = await this.verificationService.createEmailVerificationCode(
      user.id,
    );

    await this.emailService.sendVerificationEmail(user.email, code);

    return { message: 'Verification code resent successfully' };
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateToken(user: { id: string }): Promise<{ accessToken: string }> {
    const payload: { id: string } = { id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
