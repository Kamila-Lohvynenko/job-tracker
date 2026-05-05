import { IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

export class VerifyEmailResponseDto {
  @IsString()
  accessToken: string;
}

export class ResendVerificationCodeDto {
  @IsEmail()
  email: string;
}

export class ResendVerificationCodeResponseDto {
  @IsString()
  message: string;
}
