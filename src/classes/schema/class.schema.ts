import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Programs } from 'src/programs/schema/program.schema';
import { Teacher } from 'src/teachers/schema/teacher.schema';

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  about: string;

  @Prop({ type: String, ref: 'Programs' })
  type: Programs | string;

  // @Prop({ required: false })
  // teacher: string;
  @Prop({ type: String, ref: 'Teacher' })
  teacher: Teacher | string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
