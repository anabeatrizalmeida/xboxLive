import { Module } from '@nestjs/common';
import {ProfilesController} from './profiles.controller';

@Module({
  controllers: [ProfilesController],
  providers: [],
})
export class ProfilesModule {}
