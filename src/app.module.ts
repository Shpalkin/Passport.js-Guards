import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../src/auth/auth.module';
import { UserModule } from '../src/user/user.module';
import { BooksModule } from '../src/books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { JwtStrategy } from '../src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BooksModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
