import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the page title', () => {
      expect(appController.getHello()).toEqual({ title: 'Webshop rendelés', success: false, errors: [], form: {} });
    });
  });

  describe('postOrder', () => {
    it('should return success for a valid order', () => {
      const result = appController.postOrder({
        name: 'Teszt Elek',
        city: 'Budapest',
        'zip code': '1052',
        street: 'Péterfia utca',
        'house number': '12',
        's-city': 'Budapest',
        's-zip code': '1052',
        's-street': 'Péterfia utca',
        's-house number': '12',
        phone: '+36 20 123 4567',
        'Cupon code': 'AB-1234',
        'card number': '1234-5678-9012-3456',
        'expiry date': '12/30',
        cvv: '123',
      });

      expect(result.success).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should return errors for an invalid order', () => {
      const result = appController.postOrder({ name: 'x' });

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.form.name).toBe('x');
    });
  });
});
