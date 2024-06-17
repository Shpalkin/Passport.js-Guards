import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateBookDto } from '../books/dto/create_book.dto';

@Injectable()
export class ValidationBookPipe implements PipeTransform {
  transform(value: CreateBookDto) {
    if (value.title.trim().length < 10) {
      throw new HttpException('title less 10!', HttpStatus.BAD_REQUEST);
    } else if (value.description.trim().length < 20) {
      throw new HttpException('description less 20!', HttpStatus.BAD_REQUEST);
    } else {
      return value;
    }
  }
}
