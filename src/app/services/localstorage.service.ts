import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new Subject<string>();

  constructor() { }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storageSubject.next(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.storageSubject.next(key);
  }

  getStorageObservable(): Observable<string> {
    return this.storageSubject.asObservable();
  }
}