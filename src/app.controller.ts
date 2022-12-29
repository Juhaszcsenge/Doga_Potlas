import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Render,
  Post,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { Books } from './books.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listbooks() {
    const [rows] = await db.execute(
      'SELECT id, title, rating FROM books WHERE 1 ORDER by rating DESC;',
    );

    return {
      Books: rows,
    };
  }
  @Get('books/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }

  @Get('/keres')
  @Render('index')
  async booksSearch(@Query('rating') rating: number) {
    const [rows] = await db.execute(
      'SELECT id, title, rating FROM books WHERE rating LIKE ?'[rating],
    );

    return { Books: rows };
  }

  @Post('books/new')
  @Redirect()
  async newBooks(@Body() Books: Books) {
    const [result]: any = await db.execute(
      'INSERT INTO books (title, rating) VALUES (?, ?)',
      [Books.title, Books.rating],
    );
    return {
      url: '/',
    };
  }
}
