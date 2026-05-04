import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SigninDto, SigninResponseDto } from './dto/signin.dto.js';
import { SignupDto, SignupResponseDto } from './dto/signup.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto): Promise<SignupResponseDto> {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto): Promise<SigninResponseDto> {
    return this.authService.signin(body);
  }
}
