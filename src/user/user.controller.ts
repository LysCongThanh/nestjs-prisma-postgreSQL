import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class UserController {
  constructor(private userServic: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  userDetail() {
    return 1;
  }

  @Get()
  test() {
    return {user: 1}
  }
}
