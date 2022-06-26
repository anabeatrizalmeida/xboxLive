import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  users: Users[] = [];

  findAll() {
    return this.users;
  }

  create(createUsersDto: CreateUsersDto) {
    const user: Users = { id: 'random_id', ...createUsersDto };

    this.users.push(user);

    return user;
  }
}
