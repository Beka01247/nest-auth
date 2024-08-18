import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Injectable()
export class CommentOwnershipGuard implements CanActivate {
  constructor(private readonly commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const commentId = request.params.id;

    if (!user || !commentId) {
      throw new ForbiddenException('Access denied');
    }

    const comment = await this.commentService.getCommentById(commentId);

    if (!comment) {
      throw new ForbiddenException('Comment not found');
    }

    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
