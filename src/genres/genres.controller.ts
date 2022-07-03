import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGenresDto } from './dto/create-genres.dto';
import { GenresService } from './genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genres } from './entities/genres.entity';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  @ApiOperation({
    summary: 'List all genres',
  })
  findAll(): Promise<Genres[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a genre',
  })
  findOne(@Param('id') id: string): Promise<Genres> {
    return this.genresService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a genre',
  })
  create(@Body() createGenresDto: CreateGenresDto): Promise<Genres> {
    return this.genresService.create(createGenresDto);
  }
}
