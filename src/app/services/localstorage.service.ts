import { Injectable } from "@angular/core";

const _window: any = window;
const _localStorage: any = new _window.SecureLS({
  encodingType: "des",
  isCompression: false,
  encryptionSecret: "sqlchecking_LocalStorage"
});

@Injectable({
  providedIn: "root"
})
export class LocalstorageService {
  constructor() {}

  get = (key: string): any => {
    if (window.localStorage.getItem(`${"armstorage_"}${key}`)) {
      return _localStorage.get(`${"armstorage_"}${key}`);
    } else {
      return null;
    }
  };

  set = (key: string, data: any): void => {
    _localStorage.set(`${"armstorage_"}${key}`, data);
  };

  clear = (): void => {
    window.localStorage.clear();
  };
}
