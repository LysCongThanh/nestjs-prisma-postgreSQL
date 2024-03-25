import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hash = await argon.hash(registerDto.hashedPassword);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          hashedPassword: hash,
        },
      });

      delete user.hashedPassword;

      return user;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new BadRequestException('Email already exists !');
      }
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      return {
        message: "User doesn't exists",
      };
    }

    const passwordMatched = await argon.verify(
      user.hashedPassword,
      loginDto.hashedPassword,
    );

    if (!passwordMatched) {
      return {
        message: "Password doesn't match",
      };
    }

    delete user.hashedPassword;
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return await this.generateToken(payload);
  }

  async generateToken(payload: any) {
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    return {
      accessToken: jwtString,
    };
  }
}
