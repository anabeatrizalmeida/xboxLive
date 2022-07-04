import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenresDto } from './dto/create-genres.dto';
import { UpdateGenresDto } from './dto/update-genres.dto';
import { Genres } from './entities/genres.entity';


@Injectable()
export class GenresService {
  async delete(id: string) {
    await this.prisma.genres.delete({ where: { id } });
  }
  update(id: string, dto: UpdateGenresDto): Promise<Genres> {
    const data: Partial<Genres> = { ...dto };

    return this.prisma.genres.update({
      where: { id },
      data,
    });
  }

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genres[]> {
    return this.prisma.genres.findMany();
  }

  findOne(id: string): Promise<Genres> {
    return this.prisma.genres.findUnique({ where: { id }});
  }

  create(createGenresDto: CreateGenresDto): Promise<Genres> {
    const genre: Genres = {...createGenresDto };

    return this.prisma.genres.create({
      data: genre,
    });
  }
}
