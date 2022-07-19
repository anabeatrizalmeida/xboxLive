import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GamesModule} from './games/games.module';
import {GenresModule} from './genres/genres.module';
import {ProfilesModule} from './profiles/profiles.module';
import {UsersModule} from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HomepageModule } from './homepage/homepage.module';


@Module({
  imports: [GamesModule, GenresModule, ProfilesModule, UsersModule, PrismaModule, AuthModule, HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
