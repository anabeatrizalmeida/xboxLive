import { Controller, Get, Post } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Post()
  create() {
    return this.genresService.create();
  }
}
