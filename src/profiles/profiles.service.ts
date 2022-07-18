import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { UpdateProfilesDto } from './dto/update-profiles.dto';
import { Profiles } from './entities/profiles.entity';
import {handleError} from 'src/utils/handle-error.util';

@Injectable()
export class ProfilesService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.profiles.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateProfilesDto): Promise<Profiles> {
    await this.findById(id);

    const data: Partial<Profiles> = { ...dto };

    return this.prisma.profiles.update({
      where: { id },
      data,
    }).catch(handleError);
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profiles[]> {
    return this.prisma.profiles.findMany();
  }

  async findById(id: string): Promise<Profiles> {
    const record = await this.prisma.profiles.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Profiles> {
    return this.findById(id);
  }

  create(createProfilesDto: CreateProfilesDto): Promise<Profiles>  {
    const profile: Profiles = {...createProfilesDto };

    return this.prisma.profiles.create({
      data: profile,
    }).catch(handleError);
  }


}
