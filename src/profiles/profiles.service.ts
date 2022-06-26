import { Injectable } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';

@Injectable()
export class ProfilesService {
  findAll() {
    return 'Search all profiles';
  }

  create(createProfilesDto: CreateProfilesDto) {
    return 'Create a profile: '+ JSON.stringify(createProfilesDto);
  }
}
