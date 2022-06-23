import { Controller, Get } from '@nestjs/common';

@Controller('genres')
export class GenresController {
  @Get()
  findAll() {
    return 'Search all genres';
  }
}
