import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(localStorage.getItem('users') + 'local set Item');
    return value;
  }

  getItem() {
    console.log('local get item');
    return localStorage.getItem('users') || null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    return true;
  }
}
