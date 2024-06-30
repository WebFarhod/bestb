import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

// import { ClassResponseType } from './types/classResponse.type';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/enums/role.enum';
// import { TeachersService } from 'src/teachers/teachers.service';
// import { ProgramsService } from 'src/programs/programs.service';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
    // private readonly teacherService: TeachersService,
    // private readonly programService: ProgramsService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createClass(@Body() data: CreateClassDto) {
    return this.classesService.createClass(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  updateClass(@Body() data: CreateClassDto) {
    return this.classesService.updateClass(data);
  }

  @Get()
  async findAll() {
    return await this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteTeacher(@Body() data) {
    return this.classesService.deleteClass(data.id);
  }
}
