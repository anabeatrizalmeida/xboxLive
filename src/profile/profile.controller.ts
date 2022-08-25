import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '@prisma/client';
import { Profile } from './entities/profile.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all profiles',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a profile by ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a profile',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a profile by id',
  })
  update( @LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateProfileDto): Promise<Profile> {
    return this.profileService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a profile by ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.profileService.delete(user.id, id);
  }
}
