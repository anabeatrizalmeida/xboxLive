import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsBoolean, MinLength, Matches } from 'class-validator';

export class CreateUserDto  {
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Ana Beatriz',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'User nickname',
    example: 'biazinha',
  })
  nickname: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'User password',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation must be the same as password',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsBoolean()
  @ApiProperty({
    description: 'User is or is not admin',
    example: false,
  })
  isAdmin: boolean;
}
