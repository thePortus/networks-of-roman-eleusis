import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() {
    if(localStorage.getItem('userData')) {
      return localStorage.getItem('userData');
    }
    else {
      return null;
    }
  }

  setDataInLocalStorage(variableName: string, data: any) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearStorage() {
    localStorage.clear();
  }
}
