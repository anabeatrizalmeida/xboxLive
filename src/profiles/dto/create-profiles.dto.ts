import { IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProfilesDto {
  @IsString()
  @ApiProperty({
    description: 'Profile name',
    example: 'Ana Beatriz',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Profile picture link',
    example: 'https://avatars.githubusercontent.com/u/97922588?v=4',
  })
  imageURL: string;

  @IsString()
  @ApiProperty({
    description: 'Game ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  gameId?: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Favorite game ID',
    example: '9f4afb02-8108-404e-858b-f1a25ac2aa91',
  })
  favoriteGameId?: string;
}

