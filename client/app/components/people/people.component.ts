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
  filterBy: any;
  detailFields = [{
      name: 'id',
      label: 'ID',
      type: 'text'
    }, {
      name: 'title',
      label: 'Person',
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
      name: 'gender',
      label: 'Gender',
      type: 'text'
    }, {
      name: 'athenianCitizen',
      label: 'Athenian Citizen',
      type: 'check'
    }, {
      name: 'romanCitizen',
      label: 'Roman Citizen',
      type: 'check'
    }, {
      name: 'family',
      label: 'Family',
      type: 'text'
    }, {
      name: 'extended',
      label: 'Extended',
      type: 'text'
    }, {
      name: 'praenomen',
      label: 'Praenomen',
      type: 'text'
    }, {
      name: 'nomen',
      label: 'Nomen',
      type: 'text'
    }, {
      name: 'cognomen',
      label: 'Cognomen',
      type: 'text'
    }, {
      name: 'onomos',
      label: 'Onomos',
      type: 'text'
    }, {
      name: 'patronym',
      label: 'Patronym',
      type: 'text'
    }, {
      name: 'deme',
      label: 'Deme',
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
    this._api.getTypeRequest('people/').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/people/' + path]);
  }

}
