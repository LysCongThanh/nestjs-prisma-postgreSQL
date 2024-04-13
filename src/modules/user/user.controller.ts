import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { UserInterceptor } from './interceptors/user.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @UseInterceptors(UserInterceptor)
  @Get('me')
  userDetail(@Req() req: Request) {
    return req.user;
  }
}
