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
import { ColumnService } from './column.service';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import { User } from '../users/users.decorator'; // Import the User decorator
import { JwtAuthGuard } from 'src/auth/jwt.guards';
import { OwnershipGuard } from './ownership.guard';

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto, @User() user: any) {
    return this.columnService.createColumn(user.id, createColumnDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.columnService.getColumns(userId);
  }

  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.columnService.getAllByUserId(userId);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.updateColumn(id, updateColumnDto);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.deleteColumn(id);
  }
}
