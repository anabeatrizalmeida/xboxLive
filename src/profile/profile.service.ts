import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  profiles: Profile[] = [];

  findAll() {
    return this.profiles;
  }

  create(createProfileDto: CreateProfileDto) {
    const profile: Profile = { id: 'random_id', ...createProfileDto };

    this.profiles.push(profile);

    return profile;
  }
}
