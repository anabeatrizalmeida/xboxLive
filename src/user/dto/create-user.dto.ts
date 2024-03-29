import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({
    description: 'User CPF',
    example: '12345678900',
  })
  cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Is the user an administrator?',
    example: false,
  })
  isAdmin: boolean;
}
