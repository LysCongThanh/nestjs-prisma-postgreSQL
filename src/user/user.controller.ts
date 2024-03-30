import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  userDetail(@Req() req: Request) {
    return req.user;
  }

  @Get()
  test() {
    return { user: 1 };
  }
}
