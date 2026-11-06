import { Injectable } from '@nestjs/common';

export interface OrderForm {
  name?: string;
  city?: string;
  'zip code'?: string;
  street?: string;
  'house number'?: string;
  's-city'?: string;
  's-zip code'?: string;
  's-street'?: string;
  's-house number'?: string;
  phone?: string;
  'Cupon code'?: string;
  'card number'?: string;
  'expiry date'?: string;
  cvv?: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  validateOrder(form: OrderForm): string[] {
    const errors: string[] = [];

    const rules: Array<[keyof OrderForm, string, RegExp]> = [
      ['name', 'Név', /.{2,80}/],
      ['city', 'Város (számlázás)', /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű .-]{2,50}$/],
      ['zip code', 'Irányítószám (számlázás)', /^\d{4}$/],
      ['street', 'Utca (számlázás)', /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű .-]+$/],
      ['house number', 'Házszám (számlázás)', /^\d+[a-z]?$/],
      ['s-city', 'Város (szállítás)', /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű .-]{2,50}$/],
      ['s-zip code', 'Irányítószám (szállítás)', /^\d{4}$/],
      ['s-street', 'Utca (szállítás)', /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű .-]+$/],
      ['s-house number', 'Házszám (szállítás)', /^\d+[a-z]?$/],
      ['phone', 'Telefonszám', /^(\+36|\+36[\s-]?)\d{2}[\s-]?\d{3}[\s-]?\d{3,4}$/],
      ['Cupon code', 'Kupon kód', /^[A-Z]{2}-\d{4}$/],
      ['card number', 'Kártyaszám', /^\d{4}(-\d{4}){3}$/],
      ['expiry date', 'Lejárat', /^(0[1-9]|1[0-2])\/\d{2}$/],
      ['cvv', 'CVV', /^\d{3}$/],
    ];

    for (const [key, label, pattern] of rules) {
      const value = form[key];
      if (!value || !pattern.test(value)) {
        errors.push(`${label} érvénytelen`);
      }
    }

    return errors;
  }
}
