import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsBoolean } from 'class-validator';

export class CreateUserDto  {
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Ana Beatriz',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'User email',
    example: 'anabeatriz@email.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'abcd@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'User cpf',
    example: '11111111111',
  })
  cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'User admin?',
    example: true,
  })
  isAdmin: boolean;
}
