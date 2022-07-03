import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'Game title',
    example: 'Crash Bandicoot',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Link to the game cover image',
    example: 'https://m.media-amazon.com/images/I/71T-mFMy6pS._AC_SL1000_.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the game',
    example: 'Crash Bandicoot is a video game franchise originally developed by Naughty Dog for the PlayStation console. The series went through several developers and was published on several platforms later. The games are platform genre with several spin-offs of the genre race and group',
  })
  description: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Year of release of the latest version',
    example: 2020,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Imdb score (0 to 5)',
    example: 4,
  })
  imdbScore: number;

  @IsString()
  @ApiProperty({
    description: 'Game trailer on youtube',
    example: 'https://www.youtube.com/watch?v=7-IwwvIrawI',
  })
  trailerYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Gameplay on youtube',
    example: 'https://www.youtube.com/watch?v=rLR6aZ5CRXI',
  })
  gameplayYouTubeUrl: string;
}


