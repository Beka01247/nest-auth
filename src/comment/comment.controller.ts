import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import { User } from '../users/users.decorator';
import { CommentOwnershipGuard } from './comment-ownership.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: any) {
    return this.commentService.createComment(user.id, createCommentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Get()
  findAll() {
    return this.commentService.getAllComments();
  }

  @UseGuards(CommentOwnershipGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: any,
  ) {
    return this.commentService.updateComment(id, user.id, updateCommentDto);
  }

  @UseGuards(CommentOwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.commentService.deleteComment(id, user.id);
  }
}
