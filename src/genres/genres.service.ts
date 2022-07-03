import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenresDto } from './dto/create-genres.dto';
import { Genres } from './entities/genres.entity';


@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.genres.findMany();
  }

  create(createGenresDto: CreateGenresDto) {
    const genre: Genres = {...createGenresDto };

    return this.prisma.genres.create({
      data: genre,
    });
  }
}
