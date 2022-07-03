import { PartialType } from '@nestjs/mapped-types';
import { CreateProfilesDto } from './create-profiles.dto';

export class UpdateProfilesDto extends PartialType(CreateProfilesDto) {}
