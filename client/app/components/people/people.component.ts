import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { User, UserService } from './../../services/user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  loading: boolean = true;
  protectedData: any;
  dtOptions: DataTables.Settings = {};
  userDetails$: Observable<User>;
  user: any;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _user: UserService
  ) { }

  ngOnInit(): void {
    // get user profile details
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu: [15, 50, 100],
      processing: true
    };
    this._api.getTypeRequest('people/').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/people/' + path]);
  }

}
