import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { OrderForm } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { title: 'Webshop rendelés', success: false, errors: [], form: {} };
  }

  @Post()
  @Render('index')
  postOrder(@Body() body: OrderForm) {
    const errors = this.appService.validateOrder(body);
    if (errors.length > 0) {
      return { title: 'Webshop rendelés', errors, form: body, success: false };
    }
    return { title: 'Webshop rendelés', success: true, errors: [], form: body };
  }
}
