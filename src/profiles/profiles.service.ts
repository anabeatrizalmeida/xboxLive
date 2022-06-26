import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilesService {
  findAll() {
    return 'Search all profiles';
  }

  create() {
    return 'Create a profile';
  }
}
