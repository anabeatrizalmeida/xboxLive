import { IsBoolean, IsInt, IsPositive, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUsersDto {
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Ana Beatriz',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: `User's email`,
    example: 'fulano@email.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: `User's password`,
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'Password confirmation must be the same as password',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'User cpf (numbers only)',
    example: '11111111111',
  })
  cpf: number;

  @IsBoolean()
  @ApiProperty({
    description: 'The user and administrator of the account? (true or false)',
    example: 'true',
  })
  isAdmin: boolean;
}
