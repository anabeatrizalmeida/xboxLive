import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';


export class LoginResponseDto {
  @ApiProperty({
    description: 'jwt generated by login',
    example: 'automatically generated token',
  })
  token: string;

  @ApiProperty({
    description: 'Authenticated user data',
  })
  user: User;
}