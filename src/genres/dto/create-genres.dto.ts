import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGenresDto {
  @IsString()
  @ApiProperty({
    description: 'Game genre',
    example: 'adventure',
  })
  name: string;
}
