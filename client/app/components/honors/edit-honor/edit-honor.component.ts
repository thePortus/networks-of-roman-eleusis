import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-edit-honor',
  templateUrl: './edit-honor.component.html',
  styleUrls: ['./edit-honor.component.scss']
})
export class EditHonorComponent implements OnInit {
  loading: boolean = true;
  itemId: any;
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableOrigins = ['Athens', 'Cappadocia', 'Eleusis', 'Ephesus', 'Hierapolis', 'Olympia', 'Other', 'Rome'];
  acceptableCategories = ['Athenian', 'Eleusinian', 'Greek', 'Other', 'Panhellenic', 'Roman'];
  acceptableTypes = ['Magistracy', 'Liturgy/Benefaction', 'Membership/Status', 'Private Office', 'Sacred Official'];
  userDetails$: Observable<User>;
  user: any;
  protectedData: any;
  protectedRelated = {
    institutions: [],
    inscriptions: [],
    peopleWithHonors: []
  };
  isShowing = {
    inscriptions: false,
    institutions: false,
    peopleWithHonors: false
  };
  newInscription = {
    id: null
  };
  newInstitution = {
    id: null
  };
  newPersonWithHonor = {
    personId: null,
    inscriptionId: null,
    possiblePeople: [],
    appearances: 1
  };

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _user: UserService,
    private _route: ActivatedRoute,
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
    this._api.getTypeRequest('honors/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      this._api.getTypeRequest('inscriptions').subscribe((inscriptionsRes: any) => {
        this.protectedRelated.inscriptions = inscriptionsRes;
        this._api.getTypeRequest('institutions').subscribe((institutionsRes: any) => {
          this.protectedRelated.institutions = institutionsRes;
          this._api.getTypeRequest('people_with_honors').subscribe((peopleWithHonorsRes: any) => {
            this.protectedRelated.peopleWithHonors = peopleWithHonorsRes;
            this.loading = false;
          });
        });
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
    if (this._validate(this.protectedData)) {
      this._api.putTypeRequest('honors/' + this.itemId.toString(), this.protectedData).subscribe((res: any) => {
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
    this._router.navigate(['/honors/' + this.itemId.toString()]);
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
    this.newInscription = { id: idNum };
  }

  selectInstitution(idNum:number) {
    this.newInstitution = { id: idNum };
  }

  selectPersonWithHonor(personOrInscription:string, idNum: number) {
    if (personOrInscription == 'person') {
      this.newPersonWithHonor.personId = idNum;
    }
    else {
      this.newPersonWithHonor.inscriptionId = idNum;
      // copy people in inscription for selection button
      for (let inscription of this.protectedData.inscriptions) {
        if (inscription.id == idNum) {
          this.newPersonWithHonor.possiblePeople = inscription.people;
        }
      }
    }
  }

  addNewInscription() {
    if (this.newInscription.id == null) {
      this.errorMsgs.push('no inscription selected to add!');
      return;
    }
    for (let inscription of this.protectedData.inscriptions) {
      if (this.newInstitution.id == inscription.id) {
        this.errorMsgs.push('honor is already in the inscription!');
        return;
      }
    }
    if (confirm('Are you sure you want to add inscription ' + this.newInscription.id + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        honorId: this.itemId,
        inscriptionId: this.newInscription.id,
      };
      this._api.postTypeRequest('honors_in_inscriptions', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newInscription = {
            id: null
          };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  addNewInstitution() {
    if (this.newInstitution.id == null) {
      this.errorMsgs.push('no institution selected to add!');
      return;
    }
    for (let institution of this.protectedData.institutions) {
      if (this.newInstitution.id == institution.id) {
        this.errorMsgs.push('institution is already in the inscription!');
        return;
      }
    }
    if (confirm('Are you sure you want to add institution ' + this.newInstitution.id + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        honorId: this.itemId,
        institutionId: this.newInstitution.id
      };
      this._api.postTypeRequest('institution_honors', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newInstitution = {id: null};
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  addNewPersonWithHonor() {
    if (this.newPersonWithHonor.personId == null) {
      this.errorMsgs.push('no person selected to add with inscription!');
      return;
    }
    if (this.newPersonWithHonor.inscriptionId == null) {
      this.errorMsgs.push('no inscription selected to add with person!');
      return;
    }
    for (let person of this.protectedData.people) {
      for (let inscription of person.inscriptions) {
        if (person.id == this.newPersonWithHonor.personId && inscription.id == this.newPersonWithHonor.inscriptionId) {
          this.errorMsgs.push('person with honor is already in that inscription!');
          return;
        }
      }
    }
    if (confirm('Are you sure you want to add person ' + this.newPersonWithHonor.personId + ' in inscription ' + this.newPersonWithHonor.inscriptionId + ' to this honor?')) {
      const reqObject =  {
        authorizingId: this.user.username,
        inscriptionId: this.newPersonWithHonor.inscriptionId,
        personId: this.newPersonWithHonor.personId,
        honorId: parseInt(this.itemId),
        appearances: this.newPersonWithHonor.appearances
      };
      this._api.postTypeRequest('people_with_honors', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newPersonWithHonor = { personId: null, inscriptionId: null, possiblePeople: [], appearances: 1 };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }
}
