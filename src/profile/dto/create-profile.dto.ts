import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'My profile',
    example: 'Bia',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Profile image URL',
    example: 'https://avatars.githubusercontent.com/u/97922588?v=4',
  })
  imageUrl: string;

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
  favoriteGameId?: string;
}
