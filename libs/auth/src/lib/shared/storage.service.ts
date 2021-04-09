import { Injectable } from '@angular/core';

interface IStorage<T> {
  getItem: (key: string) => T;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
}

export class StorageService implements IStorage<string> {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getItem<T>(key: string): T {
    return JSON.parse(this.storage.getItem(key));
  }

  setItem<T>(key: string, value: any): void {
    return this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends StorageService {
  constructor() {
    super(sessionStorage);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  constructor() {
    super(localStorage);
  }
}
