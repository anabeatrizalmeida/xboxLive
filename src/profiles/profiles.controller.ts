import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { ProfilesService } from './profiles.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProfilesDto } from './dto/update-profiles.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Users } from '@prisma/client';


@ApiTags('profiles')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all profiles',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a profile by ID',
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a profile',
  })
  create(@LoggedUser() user: Users, @Body() createProfilesDto: CreateProfilesDto) {
    return this.profilesService.create(user.id, createProfilesDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a profile by ID',
  })
  update(
    @LoggedUser() user: Users,
    @Param('id') id: string,
    @Body() updateProfilesDto: UpdateProfilesDto,
  ) {
    return this.profilesService.update(user.id, id, updateProfilesDto);
  }

  @Patch('favoriteGame/:id')
  @ApiOperation({
    summary: 'Add a favorite game to a profile',
  })
  updateFavorite(
    @Param('id') id: string,
    @Body() updateProfilesDto: UpdateProfilesDto,
  ) {
    return this.profilesService.addOrRemoveFavoriteGame(
      id,
      updateProfilesDto.favoriteGameId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a profile by ID',
  })
  delete(@LoggedUser() user: Users, @Param('id') id: string) {
    return this.profilesService.delete(user.id, id);
  }
}

