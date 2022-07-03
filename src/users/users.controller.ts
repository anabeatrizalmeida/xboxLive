import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'List all users',
  })
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'View a user',
  })
  findOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a user',
  })
  create(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.create(createUsersDto);
  }
}
