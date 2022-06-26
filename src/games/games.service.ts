import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';

@Injectable()
export class GamesService {
  findAll() {
    return 'Search all games';
  }

  create(createGamesDto: CreateGamesDto) {
    return 'Create a game: '+ JSON.stringify(createGamesDto);
  }
}
