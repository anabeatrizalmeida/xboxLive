import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { Games } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  findOne(id: string): Promise<Games> {
    return this.prisma.games.findUnique({ where: { id }});
  }

  create(createGamesDto: CreateGamesDto): Promise<Games> {
    const game: Games = {...createGamesDto };

    return this.prisma.games.create({
      data: game,
    });
  }
}
