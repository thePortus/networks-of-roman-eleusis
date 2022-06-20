import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.component.html',
  styleUrls: ['./institution-detail.component.scss']
})
export class InstitutionDetailComponent implements OnInit {

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
    honors: [{
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
    this._api.getTypeRequest('institutions/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      // build list of officers data from nested honors
      var peopleIds = [];
      var people = [];
      // loop all honors in data
      for (let honor of this.protectedData.honors) {
        // loop each person in each honor
        for (let person of honor.people) {
          var idFound = false;
          // check if person has already been added
          for (let personId of peopleIds) {
            if (person.id == personId) {
              idFound = true;
            }
          }
          // if not added, do so
          if (!idFound) {
            peopleIds.push(person.id);
            people.push(person);
          }
        }
      }
      // copy accumulated officers to protectedData
      this.protectedData.people = people;
      this.protectedNetwork = this.makeNetwork();
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/people/' + path]);
  }

  makeNetwork() {
    var nodes = [];
    var edges = [];
    // track people and honors already found to prevent duplicates
    var foundPersonIds = [];
    nodes.push({id: this.protectedData.id, label: this.protectedData.title, group: 'institutions'});
    for (let inscription of this.protectedData.inscriptions) {
      nodes.push({id: inscription.id, label: inscription.title, group: 'inscriptions'});
      edges.push({from: this.protectedData.id, to: inscription.id});
    }
    for (let honor of this.protectedData.honors) {
      nodes.push({id: honor.id, label: honor.title, group: 'honors'});
      edges.push({from: this.protectedData.id, to: honor.id});
      for (let person of honor.people) {
        // only include if person not found before
        if(!foundPersonIds.includes(person.id)) {
          nodes.push({id: person.id, label: person.title, group: 'people'});
          foundPersonIds.push(person.id);
        }
        // add edge regardless
        edges.push({from: honor.id, to: person.id});
      }
    }
    return {
      nodes: nodes,
      edges: edges
    };
  }

}
