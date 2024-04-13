import {
  MiddlewareConsumer,
  Module,
  NestModule,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactAccessControlMiddleware } from '../../middlewares/ContactAccessControl.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer
    //   .apply(ContactAccessControlMiddleware)
    //   .forRoutes('contact/:id');
  }
}
