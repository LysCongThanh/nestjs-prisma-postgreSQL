import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtGuard } from '../auth/guard';
import { CreateContactDto } from './dto/createContact.dto';
import { Request } from 'express';
import { User } from '../../decorators/user.decorator';
import { ContactAccessControlGuard } from './guards/contact-access-control.guard';
import { EditContactDto } from './dto/editContact.dto';
import { ValidateContactIdInterceptor } from './interceptors/validate-contact-id.interceptor';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Get()
  @UseGuards(JwtGuard)
  getContact() {
    return this.contactService.getContact();
  }

  @Get(':id')
  @UseGuards(JwtGuard, ContactAccessControlGuard)
  @UseInterceptors(ValidateContactIdInterceptor)
  getContactDetails(@Param('id') id: number) {
    return this.contactService.getContactDetails(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  createContact(
    @User() user: any,
    @Req() req: Request,
    @Body() createContactDto: CreateContactDto,
  ) {
    createContactDto.userId = user.id;
    return this.contactService.createContact(createContactDto);
  }

  @Put(':id')
  @UseGuards(JwtGuard, ContactAccessControlGuard)
  @UseInterceptors(ValidateContactIdInterceptor)
  @UsePipes(new ValidationPipe())
  editContact(@Param('id') id: number, @Body() editContactDto: EditContactDto) {
    return this.contactService.editContact(id, editContactDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, ContactAccessControlGuard)
  @UseInterceptors(ValidateContactIdInterceptor)
  @UsePipes(new ValidationPipe())
  delete(@Param('id') id: number) {
    return this.contactService.deleteContact(id);
  }
}
