import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storage;

  constructor() {
    this.storage = localStorage;
    // this.storage = sessionStorage;
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  setJsonItem(key: string, value: Object) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getJsonItem(key: string) {
    return JSON.parse(this.storage.getItem(key));
  }

}
