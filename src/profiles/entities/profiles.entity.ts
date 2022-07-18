import { Users } from 'src/users/entities/users.entity';
import { Games } from "src/games/entities/games.entity";

export class Profiles {
  id?: string;
  title: string;
  imageURL: string;
  users?: Users;
  games?: Games[];
  favoriteGames?: Games[];
  createdAt?: Date;
  updatedAt?: Date;
}
