import { Module } from '@nestjs/common';
import {GenresController} from './genres.controller';
import { GenresService } from './genres.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
