import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'Search all users';
  }

  create() {
    return 'Create a user';
  }
}
