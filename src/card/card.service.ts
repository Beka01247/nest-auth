import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCardDto, UpdateCardDto } from './dto/card.dto';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard(userId: string, createCardDto: CreateCardDto) {
    const { title, columnId } = createCardDto;

    return this.prisma.card.create({
      data: {
        title,
        columnId,
        userId,
      },
    });
  }

  async getCardById(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  async getAllCards() {
    return this.prisma.card.findMany();
  }

  async updateCard(id: string, userId: string, updateCardDto: UpdateCardDto) {
    const card = await this.getCardById(id);

    if (card.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this card',
      );
    }

    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async deleteCard(id: string, userId: string) {
    const card = await this.getCardById(id);

    if (card.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this card',
      );
    }

    return this.prisma.card.delete({
      where: { id },
    });
  }
}
