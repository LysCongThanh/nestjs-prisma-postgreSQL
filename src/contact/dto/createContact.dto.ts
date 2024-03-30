import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  company: string;
}
