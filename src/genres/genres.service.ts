import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenresDto } from './dto/create-genres.dto';
import { UpdateGenresDto } from './dto/update-genres.dto';
import { Genres } from './entities/genres.entity';
import {handleError} from 'src/utils/handle-error.util';
import { Users } from 'src/users/entities/users.entity';


@Injectable()
export class GenresService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genres[]> {
    return this.prisma.genres.findMany();
  }

  async findById(id: string): Promise<Genres> {
    const record = await this.prisma.genres.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Genres> {
    return this.findById(id);
  }

  async create(dto: CreateGenresDto, user: Users): Promise<Genres> {
    if (user.isAdmin) {
      const genre: Genres = { ...dto };
      return await this.prisma.genres
        .create({
          data: genre,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async update(id: string, dto: UpdateGenresDto, user: Users): Promise<Genres> {
    if (user.isAdmin) {
      await this.findById(id);
      const data: Partial<Genres> = { ...dto };

      return this.prisma.genres
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

  async delete(id: string, user: Users) {
    if (user.isAdmin) {
      await this.findById(id);
      await this.prisma.genres.delete({ where: { id } });
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }
  }

