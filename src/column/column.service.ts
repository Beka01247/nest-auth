import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateColumnDto, UpdateColumnDto } from './dto/column.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guards';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async createColumn(userId: string, dto: CreateColumnDto) {
    const { name } = dto;

    return this.prisma.column.create({
      data: {
        name,
        userId,
      },
    });
  }

  async getColumns(userId: string) {
    return this.prisma.column.findMany({});
  }

  async getColumnById(id: string) {
    const column = await this.prisma.column.findUnique({
      where: { id },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    return column;
  }

  async getAllByUserId(userId: string) {
    return this.prisma.column.findMany({
      where: { userId },
      include: { cards: true },
    });
  }

  async updateColumn(id: string, data: UpdateColumnDto) {
    return this.prisma.column.update({
      where: { id },
      data,
    });
  }

  async deleteColumn(id: string) {
    return this.prisma.column.delete({
      where: { id },
    });
  }
}
