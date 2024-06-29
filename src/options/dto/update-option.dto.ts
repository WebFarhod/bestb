import { CreateOptionDto } from './create-option.dto';
import { IsString } from 'class-validator';

export class UpdateOptionDto extends CreateOptionDto {
  @IsString()
  _id?: string;
}
