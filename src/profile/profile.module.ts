import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileController } from './profile.controller';
import {ProfileService} from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class ProfileModule {}
