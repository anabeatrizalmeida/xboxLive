import { Controller, Get, Post } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  @Get()
  findAll() {
    return 'Search all profiles';
  }

  @Post()
  create() {
    return 'Create a profile';
  }
}
