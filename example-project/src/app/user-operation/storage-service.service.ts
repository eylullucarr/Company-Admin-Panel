import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  constructor() {}
  isLoged = new Subject<boolean>();
  isLogout = new Subject<boolean>();
  getLog = new Subject<any>();

  setToken(token: string) {
    this.isLoged.next(true);
    localStorage.setItem('token', token);
  }

  getToken() {
    let message;
    if (localStorage.getItem('token')) {
      message = true;
    } else {
      message = false;
    }
    return message;
    //verdiğin değeri sadece yolluyor doğru mu yanlış mı ife girmiş mi girmemiş mi umrunda bile değil
    // this.getLog.next(message);
  }

  removeToken() {
    localStorage.removeItem('token');
    this.isLogout.next(true);
  }
}
