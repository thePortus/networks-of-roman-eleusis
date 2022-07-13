import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { User, UserService } from './../../services/user.service';

@Component({
  selector: 'app-honors',
  templateUrl: './honors.component.html',
  styleUrls: ['./honors.component.scss']
})
export class HonorsComponent implements OnInit {

  loading: boolean = true;
  protectedData: any;
  dtOptions: DataTables.Settings = {};
  userDetails$: Observable<User>;
  user: any;
  filterBy: any;
  detailFields = [{
      name: 'id',
      label: 'ID',
      type: 'text'
    }, {
      name: 'title',
      label: 'Honor',
      type: 'text'
    }, {
      name: 'origin',
      label: 'Origin',
      type: 'text'
    }, {
      name: 'category',
      label: 'Category',
      type: 'text'
    }, {
      name: 'type',
      label: 'Type',
      type: 'text'
    }];

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
    this._api.getTypeRequest('honors/').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/honors/' + path]);
  }

}
