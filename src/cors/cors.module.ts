import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';

@Module({})
export class CorsModule implements NestModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        cors({
          origin: `255.255.255.255`,
          methods: 'GET,POST,PUT,DELETE,PATCH',
          allowedHeaders: 'Content-Type,Authorization',
        }),
      )
      .forRoutes('*');
  }
}
