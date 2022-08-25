import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { nickname, password } = loginDto;

    //Search and check if the user exists, using the nickname.
    const user = await this.prisma.user.findUnique({ where: {nickname} });

    if (!user) {
      throw new UnauthorizedException('Invalid username and/or password');
    }

    //Validates if the entered password is correct
    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid username and/or password');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({nickname}),
      user,
    };
  }
}
