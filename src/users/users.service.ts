import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany();
  }

  create(createUsersDto: CreateUsersDto) {
    const user: Users = {...createUsersDto };

    return this.prisma.users.create({
      data: user,
    });
  }
}
