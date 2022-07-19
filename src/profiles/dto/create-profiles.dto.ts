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
    example: 'd365c70b-2ce9-48f8-b0df-729c673b8a87',
  })
  gameId?: string;

  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'Favorite game ID',
    example: 'd365c70b-2ce9-48f8-b0df-729c673b8a87',
  })
  favoriteGamesId?: string;
}

