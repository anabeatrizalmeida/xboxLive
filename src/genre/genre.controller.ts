import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreService } from './genre.service';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }
}
