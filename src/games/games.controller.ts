import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { GamesService } from './games.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Games } from './entities/games.entity';
import { UpdateGamesDto } from './dto/update-games.dto';
import { AuthGuard } from '@nestjs/passport';
import { Users } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    summary: 'Find a game by ID',
  })
  findbyId(@Param('id') id: string): Promise<Games> {
    return this.gamesService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a game',
  })
  create(@LoggedUser() user: Users, @Body() createGamesDto: CreateGamesDto): Promise<Games> {
    return this.gamesService.create(createGamesDto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a game by ID',
  })

  update(
    @LoggedUser() user: Users,
    @Param('id') id: string,
    @Body() dto: UpdateGamesDto,
  ): Promise<Games> {
    return this.gamesService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a game by ID',
  })
  delete(@LoggedUser() user: Users, @Param('id') id: string) {
    this.gamesService.delete(id, user);
  }
}
