import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  genres: Genre[] = [];

  findAll() {
    return this.genres;
  }

  create(createGenreDto: CreateGenreDto) {
    const genre: Genre = { id: 'random_id', ...createGenreDto };

    this.genres.push(genre);

    return genre;
  }
}
