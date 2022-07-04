import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  async delete(id: string) {
    await this.prisma.users.delete({ where: { id } });
  }
  update(id: string, dto: UpdateUsersDto): Promise<Users> {
    const data: Partial<Users> = { ...dto };

    return this.prisma.users.update({
      where: { id },
      data,
    });
  }
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
