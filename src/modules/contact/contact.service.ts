import {
  Body,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/createContact.dto';
import { EditContactDto } from './dto/editContact.dto';

@Injectable()
export class ContactService {
  constructor(private prismaService: PrismaService) {}

  async createContact(createContactDto: CreateContactDto) {
    try {
      return await this.prismaService.contact.create({
        data: {
          name: createContactDto.name,
          user_id: parseInt(createContactDto.userId),
          company: createContactDto.company,
          telephone: createContactDto.telephone,
        },
      });
    } catch (error) {
      return {
        error: error,
      };
    }
  }
  async getContact() {
    try {
      return await this.prismaService.contact.findMany({
        include: {
          groups: true,
        },
      });
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getContactDetails(id: number) {
    try {
      const contact = await this.prismaService.contact.findFirst({
        include: {
          groups: true,
        },
        where: {
          id: id,
        },
      });

      if (!contact) {
        throw new NotFoundException('Contact not found');
      }

      return contact;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async editContact(id: number, @Body() editContactDto: EditContactDto) {
    try {
      return await this.prismaService.contact.update({
        where: {
          id: id,
        },
        data: editContactDto,
      });
    } catch (error) {
      return {
        error: 'Error updating contact',
        message: error.message,
      };
    }
  }

  async deleteContact(id: number) {
    try {
      return await this.prismaService.contact.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
