import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  cardId: string;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content?: string;
}
