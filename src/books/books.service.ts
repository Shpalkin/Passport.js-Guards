import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from '../books/interface/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create_book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  async create(create_book: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(create_book);
    return book.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  async getBook(id: string): Promise<BookDocument> {
    return this.BookModel.findById({ _id: id }).exec();
  }

  async deleteBook(id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete({ _id: id }).exec();
  }

  async updateBook(id: string, data: CreateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data).exec();
  }
}
