import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import {handleError} from 'src/utils/handle-error.util';

@Injectable()
export class UsersService {
  private usersSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany({select: this.usersSelect,});
  }

  async findById(id: string): Promise<Users> {
    const record = await this.prisma.users.findUnique({ where: { id },
    select: this.usersSelect,
   });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Users> {
    return this.findById(id);
  }

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    if (createUsersDto.password != createUsersDto.confirmPassword){
      throw new BadRequestException('The passwords provided are not the same.');
    }

    delete createUsersDto.confirmPassword;

    const user: Users = {...createUsersDto, password: await bcrypt.hash(createUsersDto.password, 10), };

    return this.prisma.users.create({
      data: user,
      select: this.usersSelect,
    }).catch(handleError);
  }

  async update(id: string, createUsersDto: UpdateUsersDto): Promise<Users> {
    await this.findById(id);

    if (createUsersDto.password) {
      if (createUsersDto.password != createUsersDto.confirmPassword) {
        throw new BadRequestException('The passwords entered are not the same.');
      }
    }

    delete createUsersDto.confirmPassword;

    const data: Partial<Users> = { ...createUsersDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.users.update({
      where: { id },
      data,
      select: this.usersSelect,
    }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.users.delete({ where: { id } });
  }

}
