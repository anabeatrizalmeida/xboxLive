import { Injectable } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { Games } from './entities/games.entity';

@Injectable()
export class GamesService {
  games: Games[] = [];

  findAll() {
    return this.games;
  }

  create(createGamesDto: CreateGamesDto) {
    const game: Games = { id: 'random_id', ...createGamesDto };

    this.games.push(game);

    return game;
  }
}
