import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GamesModule} from './games/games.module';
import {GenresModule} from './genres/genres.module';
import {ProfilesModule} from './profiles/profiles.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [GamesModule, GenresModule, ProfilesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
