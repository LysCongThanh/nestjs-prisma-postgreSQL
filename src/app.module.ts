import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as cors from 'cors';
import { AuthController } from './auth/auth.controller';
import * as cookieParser from 'cookie-parser';
import { ContactModule } from './contact/contact.module';
import { CsrfMiddleware } from './middlewares/csrf.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ContactModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
    // consumer.apply(CsrfMiddleware).forRoutes('*');
  }
}
