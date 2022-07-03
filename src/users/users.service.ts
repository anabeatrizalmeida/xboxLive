import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  findOne(id: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { id }});
  }

  create(createUsersDto: CreateUsersDto): Promise<Users> {
    const user: Users = {...createUsersDto };

    return this.prisma.users.create({
      data: user,
    });
  }
}
