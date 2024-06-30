import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  teacher: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
