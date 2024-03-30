import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactAccessControlMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
      const contactId = parseInt(req.params.id);
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
      const userId = user.sub;

      const contactById = await this.prismaService.contact.findUnique({
        where: {
          user_id: userId,
          id: contactId,
        },
      });

      if (contactById === null) {
        throw new HttpException(
          "You don't have permission",
          HttpStatus.FORBIDDEN,
        );
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({
          message: 'Token expires',
          statusCode: 401,
        });
      } else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({
          message: 'token is invalid',
          statusCode: 401,
        });
      } else {
        res.status(401).json({
          statusCode: 401,
          message: 'unauthorizied',
        });
      }
    }
  }
}
