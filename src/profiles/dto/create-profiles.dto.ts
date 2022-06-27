import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProfilesDto {
  @IsString()
  @ApiProperty({
    description: 'Profile title',
    example: 'My profile',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Profile picture link',
    example: 'https://avatars.githubusercontent.com/u/97922588?v=4',
  })
  imageURL: string;
}
