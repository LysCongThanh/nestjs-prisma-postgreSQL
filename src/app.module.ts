import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CorsModule } from "./cors/cors.module";

@Module({
  imports: [
    CorsModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
