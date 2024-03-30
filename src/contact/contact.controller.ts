import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDetailsDto } from './dto/contactDetails.dto';
import { JwtGuard } from '../auth/guard';
import { CreateContactDto } from './dto/createContact.dto';
import { Request } from 'express';
import { User } from '../decorators/user.decorator';
import { AccessControlGuard } from './guards/accessControl.guard';
import { EditContactDto } from "./dto/editContact.dto";

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Get()
  @UseGuards(JwtGuard)
  getContact() {
    return this.contactService.getContact();
  }

  @Get(':id')
  @UseGuards(JwtGuard, AccessControlGuard)
  getContactDetails(
    @Req() req: Request,
    @Param(ValidationPipe) params: ContactDetailsDto,
  ) {
    const id = parseInt(params.id);
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
  @UseGuards(JwtGuard, AccessControlGuard)
  @UsePipes(new ValidationPipe())
  editContact(
    @Req() req: Request,
    @User() user: any,
    @Body() editContactDto: EditContactDto,
  ) {
    const contactId = parseInt(req.params.id);
    return this.contactService.editContact(contactId, editContactDto);
  }
}
