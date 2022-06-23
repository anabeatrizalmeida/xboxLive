import { Module } from '@nestjs/common';
import {GenresController} from './genres.controller';

@Module({
  controllers: [GenresController],
  providers: [],
})
export class GenresModule {}
