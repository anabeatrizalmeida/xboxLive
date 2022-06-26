import { Injectable } from '@nestjs/common';
import { CreateGenresDto } from './dto/create-genres.dto';


@Injectable()
export class GenresService {
  findAll() {
    return 'Search all genres';
  }

  create(createGenresDto: CreateGenresDto) {
    return 'Create a genre: ' + JSON.stringify(createGenresDto);
  }
}
