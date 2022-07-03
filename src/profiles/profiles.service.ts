import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { Profiles } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
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
