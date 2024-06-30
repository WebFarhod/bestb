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
    const data = await this.classesService.findAll();
    // return data;
    const response = Promise.all(
      data.map(async (doc) => {
        // const program = await this.programService.findOne(doc.type);
        // const teacher = await this.teacherService.findOne(doc.teacher);

        return {
          _id: doc._id.toString(),
          image: doc.image,
          name: doc.name,
          description: doc.description,
          about: doc.about,
          type: doc.type,
          // price: program ? program.price : null,
          // infos: program ? program.infos : null,
          // price: program ? program.price : null,
          // infos: program ? program.infos : null,
          // teacher: teacher,
          // ? {
          //     _id: teacher._id.toString(),
          //     name: teacher.name,
          //     surname: teacher.surname,
          //     image: teacher.image,
          //   }
          // : null,
        };
      }),
    );
    console.log('====================================');
    console.log(response);
    console.log('====================================');

    return response;
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
