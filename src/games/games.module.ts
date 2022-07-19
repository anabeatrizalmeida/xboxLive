import { Module } from '@nestjs/common';
import {GamesController} from './games.controller';
import { GamesService } from './games.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
