import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableOrigins = ['Athens', 'Boiotia', 'Cappadocia', 'Ephesus', 'Epidaurus', 'Macedon', 'Nicomedia', 'Rome', 'Syria', 'Uncertain'];
  acceptableCategories = ['Athenian', 'Imperial Family Member', 'Other Greek', 'Roman', 'Uncertain'];
  acceptableGenders = ['Male', 'Female', 'Uncertain/Other'];
  isAthenianCitizen = true;
  isRomanCitizen = false;
  userDetails$: Observable<User>;
  user: any;
  selectedOrigin = 'Athens';
  selectedCategory = 'Athenian';
  selectedGender = 'Male';

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
      gender: this.selectedGender,
      athenianCitizen: this.isAthenianCitizen,
      romanCitizen: this.isRomanCitizen
    };
    console.log(reqObject);
    // copy values from form into request object
    Object.assign(reqObject, form.value);
    if (this._validate(reqObject)) {
      this._api.postTypeRequest('people', reqObject).subscribe((res: any) => {
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
    const dialogRef = this.dialog.open(ConfirmAddPersonDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/people/']);
    });
  }

}

@Component({
  selector: 'people-add-person-dialog',
  templateUrl: 'add-person.dialogue.html',
})
export class ConfirmAddPersonDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmAddPersonDialog>,
  ) {}
}
