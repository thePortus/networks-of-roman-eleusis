import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from './../../../services/api.service';
import { User, UserService } from './../../../services/user.service';

@Component({
  selector: 'app-edit-inscription',
  templateUrl: './edit-inscription.component.html',
  styleUrls: ['./edit-inscription.component.scss']
})
export class EditInscriptionComponent implements OnInit {
  loading: boolean = true;
  itemId: any;
  errorMsgs = [];
  serverErrorMsgs = [];
  acceptableObjectTypes = ['Altar', 'Base', 'Building or Monument', 'Column/Herm', 'Other/Fragment', 'Stele'];
  acceptableInscriptionTypes = ['Decree', 'Dedication', 'Edict/Regulation', 'Epistle', 'Other/Uncertain', 'Verse'];
  userDetails$: Observable<User>;
  user: any;
  protectedData: any;
  protectedRelated = {
    features: [],
    references: [],
    institutions: [],
    people: [],
    honors: [],
    peopleWithHonors: []
  };
  isShowing = {
    features: false,
    references: false,
    institutions: false,
    people: false,
    honors: false,
    peopleWithHonors: false
  };
  newFeature = {
    feature: null,
    uncertain: false
  };
  newReference = {
    publication: null,
    number: null,
    additional: ''
  }
  newInstitution = {
    id: null,
    role: null
  };
  newPerson = {
    id: null,
    role: null
  };
  newHonor = {
    id: null
  };
  newPersonWithHonor = {
    personId: null,
    honorId: null,
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
    this._api.getTypeRequest('inscriptions/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      this._api.getTypeRequest('institutions').subscribe((institutionsRes: any) => {
        this.protectedRelated.institutions = institutionsRes;
        this._api.getTypeRequest('people').subscribe((peopleRes: any) => {
          this.protectedRelated.people = peopleRes;
          this._api.getTypeRequest('honors').subscribe((honorsRes: any) => {
            this.protectedRelated.honors = honorsRes;
            this._api.getTypeRequest('people_with_honors').subscribe((peopleWithHonorsRes: any) => {
              this.protectedRelated.peopleWithHonors = peopleWithHonorsRes;
              this.loading = false;
            });
          });
        });
      });
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

  submit() {
    if (confirm('Are you sure you wanted to edit?')) {
      this.update();
    }
  }

  update() {
    this.protectedData.authorizingId = this.user.username;
    if (this.protectedData.date) {
      delete this.protectedData.date;
    }
    if (this.protectedData.dateSpan) {
      delete this.protectedData.dateSpan;
    }
    if (this._validate(this.protectedData)) {
      this._api.putTypeRequest('inscriptions/' + this.itemId.toString(), this.protectedData).subscribe((res: any) => {
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
    this._router.navigate(['/inscriptions/' + this.itemId.toString()]);
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

  selectInstitution(idNum:number) {
    this.newInstitution = { id: idNum, role: 'Sponsor' };
  }

  selectPerson(idNum:number) {
    this.newPerson = { id: idNum, role: 'Sponsor' };
  }

  selectHonor(idNum:number) {
    this.newHonor = { id: idNum };
  }

  selectPersonWithHonor(personOrHonor:string, idNum: number) {
    if (personOrHonor == 'person') {
      this.newPersonWithHonor.personId = idNum;
    }
    else {
      this.newPersonWithHonor.honorId = idNum;
    }
  }

  addNewFeature() {
    if (confirm('Are you sure you want to add feature ' + this.newFeature.feature + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        inscriptionId: this.itemId,
        feature: this.newFeature.feature,
        uncertain: this.newFeature.uncertain
      };
      this._api.postTypeRequest('inscription_features', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newFeature = {
            feature: null,
            uncertain: false
          };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  addNewReference() {
    if (confirm('Are you sure you want to add reference ' + this.newReference.publication + ' '+ this.newReference.number + ' ' + this.newReference.additional + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        inscriptionId: this.itemId,
        publication: this.newReference.publication,
        number: this.newReference.number,
        additional: this.newReference.additional
      };
      this._api.postTypeRequest('inscription_references', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newReference = {
            publication: null,
            number: null,
            additional: ''
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
        inscriptionId: this.itemId,
        institutionId: this.newInstitution.id,
        role: this.newInstitution.role
      };
      this._api.postTypeRequest('institution_inscriptions', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newInstitution = {
            id: null,
            role: null
          };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  addNewPerson() {
    if (this.newPerson.id == null) {
      this.errorMsgs.push('no person selected to add!');
      return;
    }
    for (let person of this.protectedData.people) {
      if (this.newPerson.id == person.id) {
        this.errorMsgs.push('person is already in the inscription!');
        return;
      }
    }
    if (confirm('Are you sure you want to add person ' + this.newPerson.id + '?')) {
      const reqObject = {
        authorizingId: this.user.username,
        inscriptionId: this.itemId,
        personId: this.newPerson.id,
        role: this.newPerson.role
      };
      this._api.postTypeRequest('people_in_inscriptions', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newPerson = {
            id: null,
            role: null
          };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

  addNewHonor() {
    if (this.newHonor.id == null) {
      this.errorMsgs.push('no honor selected to add!');
      return;
    }
    for (let honor of this.protectedData.honors) {
      if (this.newHonor.id == honor.id) {
        this.errorMsgs.push('honor is already in the inscription!');
        return;
      }
    }
    if (confirm('Are you sure you want to add honor ' + this.newHonor.id + '?')) {
      const reqObject =  {
        authorizingId: this.user.username,
        inscriptionId: this.itemId,
        honorId: this.newHonor.id
      };
      this._api.postTypeRequest('honors_in_inscriptions', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newHonor = { id: null };
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
      this.errorMsgs.push('no person selected to add with honor!');
      return;
    }
    if (this.newPersonWithHonor.honorId == null) {
      this.errorMsgs.push('no honor selected to add with person!');
      return;
    }
    for (let person of this.protectedData.people) {
      for (let honor of person.honors) {
        if (person.id == this.newPersonWithHonor.personId && honor.id == this.newPersonWithHonor.honorId) {
          this.errorMsgs.push('person with honor is already in the inscription!');
          return;
        }
      }
    }
    if (confirm('Are you sure you want to add person ' + this.newPersonWithHonor.personId + ' with honor ' + this.newPersonWithHonor.honorId + '?')) {
      const reqObject =  {
        authorizingId: this.user.username,
        inscriptionId: parseInt(this.itemId),
        personId: this.newPersonWithHonor.personId,
        honorId: this.newPersonWithHonor.honorId,
        appearances: this.newPersonWithHonor.appearances
      };
      this._api.postTypeRequest('people_with_honors', reqObject).subscribe((res: any) => {
        if (res.status !== 0) {
          this.newPersonWithHonor = { personId: null, honorId: null, appearances: 1 };
          this.load();
        }
        else {
          this.serverErrorMsgs = res.messages;
        }
      });
    }
  }

}
