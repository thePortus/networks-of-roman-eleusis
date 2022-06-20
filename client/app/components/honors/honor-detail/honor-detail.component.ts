import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-honor-detail',
  templateUrl: './honor-detail.component.html',
  styleUrls: ['./honor-detail.component.scss']
})
export class HonorDetailComponent implements OnInit {

  itemId: any;
  loading: boolean = true;
  protectedData: any;
  protectedNetwork: any;
  detailFields = {
    main: [{
      name: 'id',
      label: 'ID',
      type: 'text'
    }, {
      name: 'title',
      label: 'Honor',
      type: 'text'
    }, {
      name: 'origin',
      label: 'Origin',
      type: 'text'
    }, {
      name: 'category',
      label: 'Category',
      type: 'text'
    }, {
      name: 'type',
      label: 'Type',
      type: 'text'
    }],
    people: [{
      name: 'id',
      label: 'ID',
      type: 'text'
    }, {
      name: 'title',
      label: 'Person',
      type: 'text'
    }, {
      name: 'origin',
      label: 'Origin',
      type: 'text'
    }, {
      name: 'category',
      label: 'Category',
      type: 'text'
    }, {
      name: 'gender',
      label: 'Gender',
      type: 'text'
    }, {
      name: 'athenianCitizen',
      label: 'Athenian Citizen',
      type: 'check'
    }, {
      name: 'romanCitizen',
      label: 'Roman Citizen',
      type: 'check'
    }, {
      name: 'family',
      label: 'Family',
      type: 'text'
    }, {
      name: 'extended',
      label: 'Extended',
      type: 'text'
    }, {
      name: 'praenomen',
      label: 'Praenomen',
      type: 'text'
    }, {
      name: 'nomen',
      label: 'Nomen',
      type: 'text'
    }, {
      name: 'cognomen',
      label: 'Cognomen',
      type: 'text'
    }, {
      name: 'onomos',
      label: 'Onomos',
      type: 'text'
    }, {
      name: 'patronym',
      label: 'Patronym',
      type: 'text'
    }, {
      name: 'deme',
      label: 'Deme',
      type: 'text'
    }],
    institutions: [{
      name: 'id',
      label: 'ID',
      type: 'text'
    }, {
      name: 'title',
      label: 'Institution',
      type: 'text'
    }, {
      name: 'origin',
      label: 'Origin',
      type: 'text'
    }, {
      name: 'category',
      label: 'Category',
      type: 'text'
    }, {
      name: 'type',
      label: 'Type',
      type: 'text'
    }],
    inscriptions: [{
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
    }]
  };

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.itemId = this._route.snapshot.paramMap.get('id')
    this._api.getTypeRequest('honors/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      this.protectedNetwork = this.makeNetwork();
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/honors/' + path]);
  }

  makeNetwork() {
    var nodes = [];
    var edges = [];
    var foundInscriptionIds = [];
    nodes.push({id: this.protectedData.id, label: this.protectedData.title, group: 'honors'});
    for (let institution of this.protectedData.institutions) {
      nodes.push({id: institution.id, label: institution.title, group: 'institutions'});
      edges.push({from: this.protectedData.id, to: institution.id});
    }
    for (let person of this.protectedData.people) {
      nodes.push({id: person.id, label: person.title, group: 'people'});
      edges.push({from: this.protectedData.id, to: person.id});
      for (let inscription of person.inscriptions) {
        // avoid adding duplicate inscriptions
        if (!foundInscriptionIds.includes(inscription.id)) {
          foundInscriptionIds.push(inscription.id)
          nodes.push({id: inscription.id, label: inscription.title, group: 'inscriptions'});
        }
        edges.push({from: this.protectedData.id, to: inscription.id});
      }
    }
    return {
      nodes: nodes,
      edges: edges
    };
  }

}
