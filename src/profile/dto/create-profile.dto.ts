import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsUrl} from 'class-validator';

export class  CreateProfileDto  {
  @IsString()
  @ApiProperty({
    description: 'My profile',
    example: 'Bia',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Profile image url',
    example: 'https://avatars.githubusercontent.com/u/97922588?v=4',
  })
  imageURL: string;
}
