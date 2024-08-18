import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateColumnDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
