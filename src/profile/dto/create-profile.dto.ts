import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsUrl, IsUUID} from 'class-validator';

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

  @IsString()
  @ApiProperty({
    description: 'Game ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  gameId: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Favorite games ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  favoritesId?: string;
}
