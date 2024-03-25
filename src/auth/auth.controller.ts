import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
