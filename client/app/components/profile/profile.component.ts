import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public protectedData: any;
  public loading: boolean = true;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _user: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = JSON.parse(this._auth.getUserDetails());
    this._api.getTypeRequest('profile/' + userDetails.username).subscribe((res: any) => {
      this.protectedData = res.data;
      this.loading = false;
    });
  }

  logout() {
    this._auth.clearStorage();
    this._user.logout();
    this._router.navigate(['']);
  }

}
