import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Game title',
    example: 'Crash Bandicoot',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Game cover image url',
    example:
      'https://m.media-amazon.com/images/I/71T-mFMy6pS._AC_SL1000_.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Game description',
    example: 'Crash Bandicoot is a video game franchise originally developed by Naughty Dog for the PlayStation console. The series went through several developers and was published on several platforms later. The games are platform genre with several spin-offs of the genre race and group',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Year of release of the last version',
    example: 2020,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'IMDB score (from 0 to 5)',
    example: 4,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Game trailer URL',
    example: 'https://www.youtube.com/watch?v=7-IwwvIrawI',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay URL',
    example: 'https://www.youtube.com/watch?v=n8fWL8rz-Dw',
  })
  gameplayYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Game genre',
    example: 'adventure',
  })
  genreName: string;
}
