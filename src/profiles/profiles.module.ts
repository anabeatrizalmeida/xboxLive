import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {ProfilesController} from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
