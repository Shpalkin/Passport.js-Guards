import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './interface/book.schema';
import { CreateBookDto } from './dto/create_book.dto';
import { validationBookSchema } from '../valid/joi.validation.schema';
import { BooksValidationPipe } from '../valid/joi.validation.pipe';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @UsePipes(new BooksValidationPipe(validationBookSchema))
  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<BookDocument> {
    return await this.booksService.create(book);
  }

  @Get()
  async getAll(): Promise<BookDocument[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.getBook(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: Promise<CreateBookDto>,
  ): Promise<BookDocument> {
    return this.booksService.updateBook(id, await book);
  }
}
