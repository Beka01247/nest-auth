export class CreateCommentDto {
  content: string;
  cardId: string;
}

export class UpdateCommentDto {
  content?: string;
}
