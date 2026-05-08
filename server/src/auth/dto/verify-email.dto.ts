import { IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

export class VerifyEmailResponseDto {
  @IsString()
  message: string;
}

export class ResendVerificationCodeDto {
  @IsEmail()
  email: string;
}

export class ResendVerificationCodeResponseDto {
  @IsString()
  message: string;
}
