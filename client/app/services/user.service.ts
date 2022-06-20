import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username: string,
  email: string,
  role: string,
  token: string,
  loggedIn: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user = new BehaviorSubject<User>({
    username: '',
    email: '',
    role: '',
    token: '',
    loggedIn: false
  });
  readonly user$ = this._user.asObservable();
  private user = {
    username: '',
    email: '',
    role: '',
    token: '',
    loggedIn: false
  };

  constructor() { }

  login(userDetails: any) {
    this.user.username = userDetails.username;
    this.user.email = userDetails.email;
    this.user.role = userDetails.role;
    this.user.token = userDetails.token;
    this.user.loggedIn = true;
    this._user.next(Object.assign({}, this.user))
  }

  logout() {
    this.user.username = '';
    this.user.email = '';
    this.user.role = '';
    this.user.token = '';
    this.user.loggedIn = false;
    this._user.next(Object.assign({}, this.user))
  }
}
