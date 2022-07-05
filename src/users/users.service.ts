import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  async delete(id: string) {
    await this.findById(id);
    
    await this.prisma.users.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateUsersDto): Promise<Users> {
    await this.findById(id);

    const data: Partial<Users> = { ...dto };

    return this.prisma.users.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findById(id: string): Promise<Users> {
    const record = await this.prisma.users.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Users> {
    return this.findById(id);
  }

  create(createUsersDto: CreateUsersDto): Promise<Users> {
    const user: Users = {...createUsersDto };

    return this.prisma.users.create({
      data: user,
    }).catch(this.handleError);
  }

  handleError(error: Error):undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(lastErrorLine || 'Some error occurred while performing the operation',);
;  }
}
