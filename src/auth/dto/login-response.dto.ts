import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT generated by login',
    example: 'Token generated automatically',
  })
  token: string;

  @ApiProperty({
    description: "User's data authenticated",
  })
  user: Users;
}