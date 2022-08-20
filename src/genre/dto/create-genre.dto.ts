import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'Game genre',
    example: 'adventure',
  })
  name: string;
}
