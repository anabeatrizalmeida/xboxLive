import { Injectable } from '@nestjs/common';
import { CreateGenresDto } from './dto/create-genres.dto';
import { Genres } from './entities/genres.entity';


@Injectable()
export class GenresService {
  genres: Genres[] = [];

  findAll() {
    return this.genres;
  }

  create(createGenresDto: CreateGenresDto) {
    const genre: Genres = { id: 'random_id', ...createGenresDto };

    this.genres.push(genre);

    return genre;
  }
}
