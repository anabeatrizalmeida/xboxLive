import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { UpdateProfilesDto } from './dto/update-profiles.dto';
import { Profiles } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
  async delete(id: string) {
    await this.prisma.profiles.delete({ where: { id } });
  }
  update(id: string, dto: UpdateProfilesDto): Promise<Profiles> {
    const data: Partial<Profiles> = { ...dto };

    return this.prisma.profiles.update({
      where: { id },
      data,
    });
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profiles[]> {
    return this.prisma.profiles.findMany();
  }

  findOne(id: string): Promise<Profiles> {
    return this.prisma.profiles.findUnique({ where: { id }});
  }

  create(createProfilesDto: CreateProfilesDto): Promise<Profiles>  {
    const profile: Profiles = {...createProfilesDto };

    return this.prisma.profiles.create({
      data: profile,
    });
  }
}
