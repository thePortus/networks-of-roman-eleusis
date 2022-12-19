import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

export interface DialogData {
  username: string;
  role: string;
  confirm: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userDetails$: Observable<User>;
  user: any;
  loading: boolean = true;
  protectedData: any;
  public dtOptions: DataTables.Settings = {};
  confirm: boolean = false;

  constructor(
    private _user: UserService,
    private _api: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
    this._api.getTypeRequest('user/').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  alterUserRole(username: any, newRole: any) {
    const requestObj = {
      username: username,
      role: newRole
    };
    this._api.putTypeRequest('user/' + username, requestObj).subscribe(() => {
      this._api.getTypeRequest('user/').subscribe((res: any) => {
        this.protectedData = res;
      });
    });
  }

  openDialog(username:string, newRole:string): void {
    const dialogRef = this.dialog.open(ConfirmRoleChangeDialog, {
      width: '250px',
      data: {username: username, role: newRole},
    });

    dialogRef.afterClosed().subscribe((results) => {
      if (results == true) {
        this.alterUserRole(username, newRole);
      }
    });
  }
}

@Component({
  selector: 'users-confirm-role-change-dialog',
  templateUrl: 'role-change.dialogue.html',
})
export class ConfirmRoleChangeDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmRoleChangeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
