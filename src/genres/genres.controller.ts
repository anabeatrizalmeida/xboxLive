import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateGenresDto } from './dto/create-genres.dto';
import { GenresService } from './genres.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genres } from './entities/genres.entity';
import { UpdateGenresDto } from './dto/update-genres.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Users } from 'src/users/entities/users.entity';

@ApiTags('genres')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    summary: 'Find a genre by ID',
  })
  findOne(@Param('id') id: string): Promise<Genres> {
    return this.genresService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a genre',
  })
  create(
    @LoggedUser() user: Users,
    @Body() dto: CreateGenresDto,
  ): Promise<Genres> {
    return this.genresService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a genre by ID',
  })
  update(
    @LoggedUser() user: Users,
    @Param('id') id: string,
    @Body() dto: UpdateGenresDto,
  ): Promise<Genres> {
    return this.genresService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a genre by ID',
  })
  delete(@LoggedUser() user: Users, @Param('id') id: string) {
    this.genresService.delete(id, user);
  }
}
