import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { GamesService } from './games.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Games } from './entities/games.entity';
import { UpdateGamesDto } from './dto/update-games.dto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all games',
  })
  findAll(): Promise<Games[]> {
    return this.gamesService.findAll();

  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a game',
  })
  findOne(@Param('id') id: string): Promise<Games> {
    return this.gamesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a game',
  })
  create(@Body() createGamesDto: CreateGamesDto): Promise<Games>  {
    return this.gamesService.create(createGamesDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a game by ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGamesDto): Promise<Games> {
    return this.gamesService.update(id, dto);
  }
}
