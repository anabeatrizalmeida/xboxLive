import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { ProfilesService } from './profiles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profiles } from './entities/profiles.entity';

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
}
