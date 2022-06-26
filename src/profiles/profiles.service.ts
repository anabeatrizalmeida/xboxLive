import { Injectable } from '@nestjs/common';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { Profiles } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
  profiles: Profiles[] = [];

  findAll() {
    return this.profiles;
  }

  create(createProfilesDto: CreateProfilesDto) {
    const profile: Profiles = { id: 'random_id', ...createProfilesDto };

    this.profiles.push(profile);

    return profile;
  }
}
