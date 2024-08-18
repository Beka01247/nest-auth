import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CardService } from './card.service';

@Injectable()
export class CardOwnershipGuard implements CanActivate {
  constructor(private readonly cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const cardId = request.params.id;

    if (!user || !cardId) {
      throw new ForbiddenException('Access denied');
    }

    const card = await this.cardService.getCardById(cardId);

    if (!card) {
      throw new ForbiddenException('Card not found');
    }

    if (card.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
