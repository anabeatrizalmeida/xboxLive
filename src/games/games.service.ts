import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { Games } from './entities/games.entity';
import { handleError } from 'src/utils/handle-error.util';
import { Users } from 'src/users/entities/users.entity';
import { Prisma } from '@prisma/client';


@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.games.findMany({
      include: {
        genres: true,
      },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.games.findUnique({
      where: { id },
      include: {
        genres: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`);
    }

    return record;
  }

  async create(dto: CreateGamesDto, user: Users) {
    if (user.isAdmin) {
      const data: Prisma.GamesCreateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          connect: {
            name: dto.genreName,
          },
        },
      };

      return await this.prisma.games
        .create({
          data,
          include: {
            genres: true,
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async update(id: string, dto: UpdateGamesDto, user: Users) {
    if (user.isAdmin) {
      const gameAtual = await this.findById(id);
      const data: Prisma.GamesUpdateInput = {
        title: dto.title,
        description: dto.description,
        coverImageUrl: dto.coverImageUrl,
        year: dto.year,
        imdbScore: dto.imdbScore,
        trailerYouTubeUrl: dto.trailerYouTubeUrl,
        gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
        genres: {
          disconnect: {
            name: gameAtual.genres[0].name,
          },
          connect: {
            name: dto.genreName,
          },
        },
      };
      return await this.prisma.games
        .update({
          where: { id },
          data,
          include: {
            genres: true,
          },
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async delete(id: string, user: Users) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.games.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }
}
