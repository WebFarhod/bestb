import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schema/class.schema';
import { ProgramSchema, Programs } from 'src/programs/schema/program.schema';
import { Teacher, TeacherSchema } from 'src/teachers/schema/teacher.schema';
// import { ProgramsService } from 'src/programs/programs.service';
// import { TeachersService } from 'src/teachers/teachers.service';
// import { TeachersService } from 'src/teachers/teachers.service';
// import { ProgramsService } from 'src/programs/programs.service';
// import { TeachersModule } from 'src/teachers/teachers.module';
// import { ProgramsModule } from 'src/programs/programs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
      {
        name: Programs.name,
        schema: ProgramSchema,
      },
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
    ]),
    // TeachersModule,
    // ProgramsModule,
    // forwardRef(() => TeachersModule),
    // forwardRef(() => ProgramsModule),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
