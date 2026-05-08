import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';
import { SigninDto, SigninResponseDto } from './dto/signin.dto.js';
import { SignupDto, SignupResponseDto } from './dto/signup.dto.js';
import {
  ResendVerificationCodeDto,
  ResendVerificationCodeResponseDto,
  VerifyEmailDto,
  VerifyEmailResponseDto,
} from './dto/verify-email.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() body: SignupDto): Promise<SignupResponseDto> {
    return this.authService.signup(body);
  }

  @Public()
  @Post('/signin')
  async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninResponseDto> {
    const { accessToken } = await this.authService.signin(body);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      message: 'Signin successful',
    };
  }

  @Public()
  @Post('/verify-email')
  async verifyEmail(
    @Body() body: VerifyEmailDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<VerifyEmailResponseDto> {
    const { accessToken } = await this.authService.verifyEmail(body);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      message: 'Email verified successfully',
    };
  }

  @Public()
  @Post('/resend-verification-code')
  resendVerificationCode(
    @Body() body: ResendVerificationCodeDto,
  ): Promise<ResendVerificationCodeResponseDto> {
    return this.authService.resendVerificationCode(body);
  }

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
