import { Controller, Get, Post } from '@nestjs/common';

@Controller('genres')
export class GenresController {
  @Get()
  findAll() {
    return 'Search all genres';
  }

  @Post()
  create() {
    return 'Create a genre';
  }
}
