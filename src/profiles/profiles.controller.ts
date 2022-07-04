import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profiles } from './entities/profiles.entity';
import { UpdateProfilesDto } from './dto/update-profiles.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all profiles',
  })
  findAll(): Promise<Profiles[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a profile',
  })
  findOne(@Param('id') id: string): Promise<Profiles> {
    return this.profilesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a profile',
  })
  create(@Body() createProfilesDto: CreateProfilesDto): Promise<Profiles>  {
    return this.profilesService.create(createProfilesDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a profile by ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProfilesDto): Promise<Profiles> {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a profile by ID',
  })
  delete(@Param('id') id: string) {
    this.profilesService.delete(id);
  }
}
