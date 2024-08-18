import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  columnId: string;
}

export class UpdateCardDto {
  @IsString()
  @IsNotEmpty()
  title?: string;
}
