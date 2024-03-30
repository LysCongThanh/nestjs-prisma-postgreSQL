import { IsNotEmpty, IsString } from "class-validator";

export class ContactDetailsDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
