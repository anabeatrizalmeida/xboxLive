import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator';
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
    description: `user's email`,
    example: 'fulano@email.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: `User's password`,
    example: 'password123',
  })
  password: string;

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
