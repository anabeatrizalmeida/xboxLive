import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfilesDto } from './dto/create-profiles.dto';
import { Profiles } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profiles.findMany();
  }

  create(createProfilesDto: CreateProfilesDto) {
    const profile: Profiles = {...createProfilesDto };

    return this.prisma.profiles.create({
      data: profile,
    });
  }
}
