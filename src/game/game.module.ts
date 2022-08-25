import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class GameModule {}
