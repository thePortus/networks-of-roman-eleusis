import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  loading: boolean = true;
  protectedData: any;
  downloadJsonHrefs = {
    inscriptions: null,
    institutions: null,
    people: null,
    honors: null,
    inscriptionFeatures: null,
    inscriptionReferences: null,
    honorsInInscriptions: null,
    institutionHonors: null,
    institutionInscriptions: null,
    peopleInInscriptions: null,
    peopleWithHonors: null
  };

  constructor(
    private _api: ApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this._api.getTypeRequest('export/').subscribe((res: any) => {
      this.protectedData = res;
      this.generateDownloadJsonUri();
      this.loading = false;
    });
  }

  generateDownloadJsonUri() {
    var theJSON = null;
    var uri = null;
    theJSON = JSON.stringify(this.protectedData.inscriptions);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.inscriptions = uri;
    theJSON = JSON.stringify(this.protectedData.institutions);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.institutions = uri;
    theJSON = JSON.stringify(this.protectedData.people);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.people = uri;
    theJSON = JSON.stringify(this.protectedData.honors);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.honors = uri;
    theJSON = JSON.stringify(this.protectedData.inscriptionFeatures);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.inscriptionFeatures = uri;
    theJSON = JSON.stringify(this.protectedData.inscriptionReferences);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.inscriptionReferences = uri;
    theJSON = JSON.stringify(this.protectedData.honorsInInscriptions);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.honorsInInscriptions = uri;
    theJSON = JSON.stringify(this.protectedData.institutionHonors);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.institutionHonors = uri;
    theJSON = JSON.stringify(this.protectedData.institutionInscriptions);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.institutionInscriptions = uri;
    theJSON = JSON.stringify(this.protectedData.peopleInInscriptions);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.peopleInInscriptions = uri;
    theJSON = JSON.stringify(this.protectedData.peopleWithHonors);
    uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHrefs.peopleWithHonors = uri;
  }

}
