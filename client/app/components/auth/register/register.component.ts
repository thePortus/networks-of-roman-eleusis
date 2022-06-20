import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: any;
  showErrorMessage: boolean = false;
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
    this.showErrorMessage = false;
    if (form.value.password !== form.value.password2) {
      this.errorMessage = 'Error: passwords must match!'
      this.showErrorMessage = true;
    }
    else {
      this._api.postTypeRequest('user/register', form.value).subscribe((res: any) => {
        if (res.status) {
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('token', res.token);
          this._user.login({
            username: res.data.username,
            email: res.data.email,
            role: res.data.role,
            token: res.token
          });
          this._router.navigate(['login']);
        }
        else {
          this.errorMessage = res.message;
          this.showErrorMessage = true;
        }
      });
    }
  }

  isUserLogin() {
    if(this._auth.getUserDetails() != null) {
      const userDetails = JSON.parse(this._auth.getUserDetails());
      this._user.login({
        username: userDetails.username,
        email: userDetails.email,
        role: userDetails.role,
        token: userDetails.token
      });
    }
  }

}
