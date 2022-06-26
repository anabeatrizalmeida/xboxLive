import { Injectable } from '@nestjs/common';

@Injectable()
export class GenresService {
  findAll() {
    return 'Search all genres';
  }

  create() {
    return 'Create a genre';
  }
}
