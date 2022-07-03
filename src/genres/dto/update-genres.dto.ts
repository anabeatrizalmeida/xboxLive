import { PartialType } from '@nestjs/mapped-types';
import { CreateGenresDto } from './create-genres.dto';

export class UpdateGenresDto extends PartialType(CreateGenresDto) {}
