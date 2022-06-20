import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  userDetails$: Observable<User>;
  user: any;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
  }

  onSubmit(form: NgForm) {
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._user.login({
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
          token: res.token
        });
        this._router.navigate(['']);
      }
    });
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      const userDetails = JSON.parse(this._auth.getUserDetails());
      this._user.login({
        username: userDetails.username,
        email: userDetails.email,
        role: userDetails.role,
        token: userDetails.token
      })
    }
  }

  logout() {
    this._auth.clearStorage();
    this._user.logout();
    this._router.navigate(['']);
  }

}
