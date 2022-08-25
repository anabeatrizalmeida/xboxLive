import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findById(id: string): Promise<Profile> {
    const profile: Profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException(`Id entry '${id}' not found. Try again later!`);
    }

    return profile;
  }

  async findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  async create(dto: CreateProfileDto, user: User): Promise<Profile> {
    if (user.isAdmin) {
      const profile: Profile = { ...dto };
      return await this.prisma.profile
        .create({
          data: profile,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }

  async update(id: string, dto: UpdateProfileDto, user: User): Promise<Profile> {
    if (user.isAdmin) {
      await this.findById(id);
      const data: Partial<Profile> = { ...dto };

      return this.prisma.profile
        .update({
          where: { id },
          data,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }


  async delete(userId: string, id: string) {
    await this.findOne(id);
    await this.prisma.profile.delete({ where: { id } });
  }
}
