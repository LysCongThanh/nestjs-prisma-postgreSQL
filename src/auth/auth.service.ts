import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto";
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(registerDto: RegisterDto) {
    return registerDto;
  }
}
