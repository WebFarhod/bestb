import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as fs from 'fs';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './schema/class.schema';
import { Programs } from 'src/programs/schema/program.schema';
import { Teacher } from 'src/teachers/schema/teacher.schema';
// import { ClassResponseType } from './types/classResponse.type';
@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,
    @InjectModel(Programs.name) private programModel: Model<Programs>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async createClass(data: CreateClassDto) {
    const newClass = new this.classModel(data);
    return await newClass.save();
  }

  async updateClass(data: CreateClassDto) {
    const tData = await this.classModel.findById(data._id);
    if (!tData) {
      throw new NotFoundException(`Data not found`);
    }
    tData.image = data.image;
    tData.name = data.name;
    tData.description = data.description;
    tData.about = data.about;
    tData.type = data.type;
    tData.teacher = data.teacher;

    return tData.save();
  }

  // async findAll() {
  //   const data = this.classModel.find().exec();
  //   if (!data) {
  //     throw new NotFoundException(`Data not found`);
  //   }

  //   const response = await Promise.all(
  //     (await data).map(async (doc) => {
  //       const program = await this.programModel.findById(doc.type).exec();
  //       const teacher = await this.teacherModel.findById(doc.teacher).exec();

  //       return {
  //         _id: doc._id.toString(),
  //         image: doc.image,
  //         name: doc.name,
  //         description: doc.description,
  //         about: doc.about,
  //         type: doc.type,
  //         price: program ? program.price : null,
  //         infos: program ? program.infos : null,
  //         teacher: teacher
  //           ? {
  //               _id: teacher._id.toString(),
  //               name: teacher.name,
  //               surname: teacher.surname,
  //               image: teacher.image,
  //             }
  //           : null,
  //       };
  //     }),
  //   );

  //   return response;
  // }

  findOne(id: string) {
    const data = this.classModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  async deleteClass(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.classModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    try {
      const deletedCount = await this.classModel.deleteMany({
        _id: { $in: id },
      });

      if (deletedCount.deletedCount === 0) {
        console.warn('No classs found with the provided IDs');
        throw new NotFoundException(`No classs found with the provided IDs`);
      } else {
        console.log(`${deletedCount.deletedCount} classs deleted successfully`);

        throw new NotFoundException(
          `${deletedCount.deletedCount} classs deleted successfully`,
        );
      }
    } catch (error) {
      console.error('Error deleting classs:', error);
      throw error;
    }
  }
}
