import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async findById(id: string): Promise<Game> {
    const game: Game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Id entry '${id}' not found. Try again later!`);
    }

    return game;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(dto: CreateGameDto, user: User): Promise<Game> {
    if (user.isAdmin) {
      const game: Game = { ...dto };
      return await this.prisma.game
        .create({
          data: game,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async update(id: string, dto: UpdateGameDto, user: User): Promise<Game> {
    if (user.isAdmin) {
      await this.findById(id);
      const data: Partial<Game> = { ...dto };

      return this.prisma.game
        .update({
          where: { id },
          data,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.game.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }
}
