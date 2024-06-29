import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TeacherRank {
  @Prop({ required: true })
  title: string;
}

export const TeacherRankSchema = SchemaFactory.createForClass(TeacherRank);
