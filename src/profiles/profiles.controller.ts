import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { ProfilesService } from './profiles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Post()
  create(@Body() createProfilesDto: CreateProfilesDto) {
    return this.profilesService.create(createProfilesDto);
  }
}
