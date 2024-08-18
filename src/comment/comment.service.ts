import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(userId: string, createCommentDto: CreateCommentDto) {
    const { content, cardId } = createCommentDto;

    return this.prisma.comment.create({
      data: {
        content,
        cardId,
        userId,
      },
    });
  }

  async getCommentById(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async getAllComments() {
    return this.prisma.comment.findMany();
  }

  async updateComment(
    id: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.getCommentById(id);

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment',
      );
    }

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async deleteComment(id: string, userId: string) {
    const comment = await this.getCommentById(id);

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
