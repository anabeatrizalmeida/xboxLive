import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { Games } from './entities/games.entity';

@Injectable()
export class GamesService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.games.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateGamesDto): Promise<Games> {
    await this.findById(id);

    const data: Partial<Games> = { ...dto };

    return this.prisma.games.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Games[]> {
    return this.prisma.games.findMany();
  }

  async findById(id: string): Promise<Games> {
    const record = await this.prisma.games.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Games> {
    return this.findById(id);
  }

  create(createGamesDto: CreateGamesDto): Promise<Games> {
    const game: Games = {...createGamesDto };

    return this.prisma.games.create({
      data: game,
    }).catch(this.handleError);
  }

  handleError(error: Error):undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(lastErrorLine || 'Some error occurred while performing the operation',);
;  }
}
