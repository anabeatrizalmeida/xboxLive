import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { UpdateProfilesDto } from './dto/update-profiles.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfilesDto) {
    if (dto.gameId) {
      return await this.prisma.profiles
        .create({
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { games: true, user: true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profiles
        .create({
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  findAll() {
    return this.prisma.profiles.findMany({
      include: {
        games: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.profiles
      .findUnique({
        where: { id },
        include: {
          users: {
            select: {
              name: true,
            },
          },
          games: true,
          favoriteGames: {
            select: {
              games: true,
              id: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async addOrRemoveFavoriteGame(profileId: string, gameId: string) {
    const user = await this.findOne(profileId);
    let favoriteGame = false;
    user.favoriteGames.games.map((game) => {
      if (game.id === gameId) {
        favoriteGame = true;
      }
    });
    if (favoriteGame) {
      return await this.prisma.favoriteGames.update({
        where: { id: user.favoriteGames.id },
        data: {
          games: {
            disconnect: {
              id: gameId,
            },
          },
        },
      });
    } else {
      return await this.prisma.favoriteGames.update({
        where: { profileId },
        data: {
          games: {
            connect: {
              id: gameId,
            },
          },
        },
      });
    }
  }

  async update(userId: string, id: string, dto: UpdateProfilesDto) {
    const user = await this.findOne(id);

    if (dto.gameId) {
      let GameExist = false;
      user.games.map((game) => {
        if (game.id == dto.gameId) {
          GameExist = true;
        }
      });
      if (GameExist) {
        return this.prisma.profiles
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageURL: dto.imageURL,
              userId: userId,
              games: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      } else {
        return this.prisma.profiles
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageURL: dto.imageURL,
              userId: userId,
              games: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
          })
          .catch(handleError);
      }
    } else {
      return this.prisma.profiles
        .update({
          where: { id: id },
          data: {
            title: dto.title,
            imageURL: dto.imageURL,
            userId: userId,
          },
          include: { games: true },
        })
        .catch(handleError);
    }
  }

  async delete(userId: string, id: string) {
    await this.findOne(id);
    await this.prisma.profiles.delete({ where: { id } });
  }
}
