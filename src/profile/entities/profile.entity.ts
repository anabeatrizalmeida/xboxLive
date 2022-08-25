import { Game } from "src/game/entities/game.entity";
import { User } from "src/user/entities/user.entity";

export class Profile {
  id?: string;
  title: string;
  imageURL: string;
  user?: User;
  game?: Game[];
  favorites?: Game[];
}
