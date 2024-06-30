import { IsOptional, IsString } from 'class-validator';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends CreateNewsDto {
  @IsOptional()
  @IsString()
  _id?: string;
}
