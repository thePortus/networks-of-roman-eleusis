import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-add-inscription',
  templateUrl: './add-inscription.component.html',
  styleUrls: ['./add-inscription.component.scss']
})
export class AddInscriptionComponent implements OnInit {
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableObjectTypes = ['Altar', 'Base', 'Building or Monument', 'Column/Herm', 'Other/Fragment', 'Stele'];
  acceptableInscriptionTypes = ['Decree', 'Dedication', 'Edict/Regulation', 'Epistle', 'Other/Uncertain', 'Verse'];
  userDetails$: Observable<User>;
  user: any;
  selectedObjectType = 'Base';
  selectedInscriptionType = 'Dedication';
  isLowDateUncertain = false;
  isHighDateUncertain = false;
  inscriptionText = '';

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
    if (reqObject.ie == '' || reqObject.ie.replace(/\s+/g, ' ') == ' ') {
      this.errorMsgs.push('IE cannot be blank or a space');
      isValid = false;
    }
    if (reqObject.title == '' || reqObject.title.replace(/\s+/g, ' ') == ' ') {
      this.errorMsgs.push('Title cannot be blank or a space');
      isValid = false;
    }
    if (reqObject.lowDate == '') {
      this.errorMsgs.push('Low Date cannot be blank');
      isValid = false;
    }
    if (reqObject.lowDate == '') {
      this.errorMsgs.push('High Date cannot be blank');
      isValid = false;
    }
    if (reqObject.lowDate > reqObject.highDate) {
      this.errorMsgs.push('Low Date cannot be higher than High Date');
      isValid = false;
    }
    if (reqObject.text == '' || reqObject.text.replace(/\s+/g, ' ') == ' ') {
      this.errorMsgs.push('Text cannot be blank or a space');
      isValid = false;
    }
    return isValid;
  }

  onSubmit(form: NgForm) {
    var reqObject = {
      objectType: this.selectedObjectType,
      inscriptionType: this.selectedInscriptionType,
      lowDateUncertain: this.isLowDateUncertain,
      highDateUncertain: this.isHighDateUncertain,
      text: this.inscriptionText
    };
    // copy values from form into request object
    Object.assign(reqObject, form.value);
    if (this._validate(reqObject)) {
      this._api.postTypeRequest('inscriptions', reqObject).subscribe((res: any) => {
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
    const dialogRef = this.dialog.open(ConfirmAddInscriptionDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/inscriptions/']);
    });
  }

}

@Component({
  selector: 'inscriptions-add-inscription-dialog',
  templateUrl: 'add-inscription.dialogue.html',
})
export class ConfirmAddInscriptionDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmAddInscriptionDialog>,
  ) {}
}
