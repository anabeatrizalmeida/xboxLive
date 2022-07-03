import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenresDto } from './dto/create-genres.dto';
import { Genres } from './entities/genres.entity';


@Injectable()
export class GenresService {
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
