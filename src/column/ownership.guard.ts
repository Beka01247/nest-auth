import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ColumnService } from './column.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly columnService: ColumnService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const columnId = request.params.id;

    if (!user || !columnId) {
      throw new ForbiddenException('Access denied');
    }

    const column = await this.columnService.getColumnById(columnId);

    if (!column) {
      throw new ForbiddenException('Column not found');
    }

    if (column.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
