import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ContactAccessControlGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = parseInt(request.user.id);
    const contactId = parseInt(request.params.id);

    return this.checkContactAccessControl(userId, contactId);
  }

  private async checkContactAccessControl(userId: number, contactId: number) {
    const contact = await this.prismaService.contact.findUnique({
      where: {
        id: contactId,
        user_id: userId,
      },
    });

    if (contact) {
      return true;
    }
    return false;
  }
}
