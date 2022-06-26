import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  findAll() {
    return 'Search all games';
  }

  create() {
    return 'Create a game';
  }
}
