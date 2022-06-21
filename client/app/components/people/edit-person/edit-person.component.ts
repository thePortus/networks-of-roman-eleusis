import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  loading: boolean = true;
  itemId: any;
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableOrigins = ['Athens', 'Boiotia', 'Cappadocia', 'Ephesus', 'Epidaurus', 'Macedon', 'Nicomedia', 'Rome', 'Syria', 'Uncertain'];
  acceptableCategories = ['Athenian', 'Imperial Family Member', 'Other Greek', 'Roman', 'Uncertain'];
  acceptableGenders = ['Male', 'Female', 'Uncertain/Other'];
  userDetails$: Observable<User>;
  user: any;
  protectedData: any;
  protectedRelated = {
    inscriptions: []
  };
  isShowing = {
    inscriptions: false
  };
  newInscription = {
    id: null,
    role: 'Sponsor'
  };

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _user: UserService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.errorMsgs = [];
    // get user profile details
    this.itemId = this._route.snapshot.paramMap.get('id')
    this.userDetails$ = this._user.user$;
    this.userDetails$.subscribe(result => {
      this.user = result;
    });
    this._api.getTypeRequest('people/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      this._api.getTypeRequest('inscriptions').subscribe((inscriptionsRes: any) => {
        this.protectedRelated.inscriptions = inscriptionsRes;
        this.loading = false;
      });
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

  submit() {
    if (confirm('Are you sure you wanted to edit?')) {
      this.update();
    }
  }

  update() {
    this.protectedData.authorizingId = this.user.username;
    // preen reqData of uneeded item info before sending
    var reqData = this.protectedData;
    delete reqData.inscriptions;
    delete reqData.honors;
    if (this._validate(reqData)) {
      this._api.putTypeRequest('people/' + this.itemId.toString(), reqData).subscribe((res: any) => {
        if (res.status !== 0) {
          this.gotoDetailsPage();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  gotoDetailsPage() {
    this._router.navigate(['/people/' + this.itemId.toString()]);
  }

  toggleShowing(field:string) {
    this.isShowing[field] = !this.isShowing[field];
  }

  deletedRelated(table:string,idNum:number|number[]) {
    if (confirm('Are you sure you delete item' + idNum + '? WARNING: CANNOT BE UNDONE!')) {
      if (typeof idNum == 'string' || typeof idNum == 'number') {
        this._api.deleteTypeRequest(table + '/' + idNum).subscribe(() => {
          this.load()
        });
      }
      // handles urls with multiple ids
      else if (typeof idNum == 'object') {
        var path = table + '/';
        for (let idSegment of idNum) {
          path = path + idSegment.toString() + '/';
        }
        this._api.deleteTypeRequest(path).subscribe(() => {
          this.load()
        });
      }
    }
  }

  selectInscription(idNum:number) {
    this.newInscription = { id: idNum , role: 'Sponsor' };
  }

  addNewInscription() {
    if (this.newInscription.id == null) {
      this.errorMsgs.push('no inscription selected to add!');
      return;
    }
    for (let inscription of this.protectedData.inscriptions) {
      if (this.newInscription.id == inscription.id) {
        this.errorMsgs.push('person is already in the inscription!');
        return;
      }
    }
    if (confirm('Are you sure you want to add inscription ' + this.newInscription.id + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        personId: this.itemId,
        inscriptionId: this.newInscription.id,
      };
      this._api.postTypeRequest('people_in_inscriptions', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newInscription = {
            id: null,
            role: 'Sponsor'
          };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

}
