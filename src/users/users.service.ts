import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  findAll() {
    return 'Search all users';
  }

  create(createUsersDto: CreateUsersDto) {
    return 'Create a user: ' + JSON.stringify(createUsersDto);;
  }
}
