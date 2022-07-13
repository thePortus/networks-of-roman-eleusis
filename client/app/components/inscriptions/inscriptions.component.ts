import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from './../../services/api.service';
import { User, UserService } from './../../services/user.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {

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
      name: 'ie',
      label: 'IE',
      type: 'text'
    }, {
      name: 'objectType',
      label: 'Object Type',
      type: 'text'
    }, {
      name: 'inscriptionType',
      label: 'Inscription Type',
      type: 'text'
    }, {
      name: 'location',
      label: 'Location',
      type: 'text'
    }, {
      name: 'date',
      label: 'Date',
      type: 'text'
    }, {
      name: 'lowDate',
      label: 'Low Date',
      type: 'text'
    }, {
      name: 'highDate',
      label: 'High Date',
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
    this._api.getTypeRequest('inscriptions/').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/inscriptions/' + path]);
  }

}
