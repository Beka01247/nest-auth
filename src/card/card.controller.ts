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
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dto/card.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import { User } from '../users/users.decorator';
import { CardOwnershipGuard } from 'src/card/card-ownership.guard';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @User() user: any) {
    return this.cardService.createCard(user.id, createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.getCardById(id);
  }

  @Get()
  findAll() {
    return this.cardService.getAllCards();
  }

  @UseGuards(CardOwnershipGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @User() user: any,
  ) {
    return this.cardService.updateCard(id, user.id, updateCardDto);
  }

  @UseGuards(CardOwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.cardService.deleteCard(id, user.id);
  }
}
