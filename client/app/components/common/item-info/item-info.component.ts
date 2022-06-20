import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  @Input() label = '';
  @Input() table = '';
  @Input() fields = [];
  @Input() data = {};

  loading: boolean = true;
  isShowing: boolean = true;
  protectedData: any;
  userDetails$: Observable<User>;
  user: any;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _user: UserService,
  ) { }

  ngOnInit(): void {
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.protectedData = changes['data'].currentValue;
    this.loading = false;
  }

  toggleShowing() {
    this.isShowing = !this.isShowing;
  }

  goToEdit() {
    this._router.navigate(['/' + this.table + '/edit/' + this.protectedData.id]);
  }

  deleteItem() {
    if (confirm('Are you sure you delete this item? WARNING: CANNOT BE UNDONE!')) {
      this._api.deleteTypeRequest(this.table + '/' + this.protectedData.id).subscribe(() => {
        this._router.navigate(['/' + this.table]);
      });
    }
  }

}
