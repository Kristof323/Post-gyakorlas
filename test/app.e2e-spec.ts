import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { join } from 'node:path';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/WEBSHOP/);
  });

  it('/ (POST) valid order renders success', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
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
      })
      .expect(201)
      .expect(/A rendelés leadása sikeres volt\./);
  });

  it('/ (POST) invalid order re-renders form with errors', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ name: 'x' })
      .expect(201)
      .expect(/Név érvénytelen/);
  });

  afterEach(async () => {
    await app.close();
  });
});
