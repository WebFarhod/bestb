import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './schema/class.schema';
@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) {}

  async createClass(data: CreateClassDto) {
    const newClass = new this.classModel(data);
    return await newClass.save();
  }

  async updateClass(data: CreateClassDto) {
    const tData = await this.classModel.findById(data._id).exec();
    if (!tData) {
      throw new NotFoundException(`Data not found`);
    }
    tData.image = data.image;
    tData.name = data.name;
    tData.description = data.description;
    tData.about = data.about;
    tData.type = data.type;
    tData.teacher = data.teacher;
    return await tData.save();
  }

  async findAll() {
    const data = await this.classModel.find().exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }

    return data;
  }

  async findOne(id: string) {
    const data = await this.classModel.findById(id);
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
