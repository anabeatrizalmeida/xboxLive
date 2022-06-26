import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'Search all users';
  }

  @Post()
  create() {
    return 'Create a user';
  }
}
