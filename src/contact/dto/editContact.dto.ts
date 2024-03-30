import { IsOptional, IsString } from 'class-validator';

export class EditContactDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  telephone?: string;
}
