import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';


@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' }) ],
})
export class GenreModule {}
