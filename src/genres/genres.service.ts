import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenresDto } from './dto/create-genres.dto';
import { UpdateGenresDto } from './dto/update-genres.dto';
import { Genres } from './entities/genres.entity';


@Injectable()
export class GenresService {
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.genres.delete({ where: { id } });
  }
  async update(id: string, dto: UpdateGenresDto): Promise<Genres> {
    await this.findById(id);

    const data: Partial<Genres> = { ...dto };

    return this.prisma.genres.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genres[]> {
    return this.prisma.genres.findMany();
  }

  async findById(id: string): Promise<Genres> {
    const record = await this.prisma.genres.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with '${id}' not found.`)
    }

    return record;
  }

  async findOne(id: string): Promise<Genres> {
    return this.findById(id);
  }

  create(createGenresDto: CreateGenresDto): Promise<Genres> {
    const genre: Genres = {...createGenresDto };

    return this.prisma.genres.create({
      data: genre,
    }).catch(this.handleError);
  }

  handleError(error: Error):undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(lastErrorLine || 'Some error occurred while performing the operation',);
;  }
}
