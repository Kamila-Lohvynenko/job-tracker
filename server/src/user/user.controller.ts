import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import {
  CurrentUser,
  type JwtUser,
} from '../auth/decorators/current-user.decorator.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@CurrentUser() user: JwtUser | undefined) {
    const userId = user?.id;

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.userService.getMe(userId);
  }
}
