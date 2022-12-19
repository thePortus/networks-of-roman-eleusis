import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-add-honor',
  templateUrl: './add-honor.component.html',
  styleUrls: ['./add-honor.component.scss']
})
export class AddHonorComponent implements OnInit {
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableOrigins = ['Athens', 'Cappadocia', 'Eleusis', 'Ephesus', 'Hierapolis', 'Olympia', 'Other', 'Rome'];
  acceptableCategories = ['Athenian', 'Eleusinian', 'Greek', 'Other', 'Panhellenic', 'Roman'];
  acceptableTypes = ['Magistracy', 'Liturgy/Benefaction', 'Membership/Status', 'Private Office', 'Sacred Official'];
  userDetails$: Observable<User>;
  user: any;
  selectedOrigin = 'Athens';
  selectedCategory = 'Athenian';
  selectedType = 'Magistracy';

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _user: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // get user profile details
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
  }

  private _validate(reqObject: any): boolean {
    var isValid = true;
    this.errorMsgs = [];
    if (reqObject.title == '' || reqObject.title.replace(/\s+/g, ' ') == ' ') {
      this.errorMsgs.push('Title cannot be blank or a space');
      isValid = false;
    }
    return isValid;
  }

  onSubmit(form: NgForm) {
    var reqObject = {
      origin: this.selectedOrigin,
      category: this.selectedCategory,
      type: this.selectedType
    };
    console.log(reqObject);
    // copy values from form into request object
    Object.assign(reqObject, form.value);
    if (this._validate(reqObject)) {
      this._api.postTypeRequest('honors', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.openDialog();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmAddHonorDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/honors/']);
    });
  }

}

@Component({
  selector: 'honors-add-honor-dialog',
  templateUrl: 'add-honor.dialogue.html',
})
export class ConfirmAddHonorDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmAddHonorDialog>,
  ) {}
}
