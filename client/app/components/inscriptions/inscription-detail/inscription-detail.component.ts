import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrls: ['./inscription-detail.component.scss']
})
export class InscriptionDetailComponent implements OnInit {

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
      name: 'lowDateUncertain',
      label: 'Low Date Uncertain',
      type: 'check'
    }, {
      name: 'highDate',
      label: 'High Date',
      type: 'text'
    }, {
      name: 'highDateUncertain',
      label: 'High Date Uncertain',
      type: 'check'
    }, {
      name: 'features',
      label: 'Features',
      type: 'list',
      fieldName: 'feature'
    }, {
      name: 'references',
      label: 'References',
      type: 'list',
      fieldName: 'reference'
    }, {
      name: 'text',
      label: 'Text',
      type: 'code'
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
      label: 'Ath. Citizen',
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
    }]
  };

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.itemId = this._route.snapshot.paramMap.get('id')
    this._api.getTypeRequest('inscriptions/' + this.itemId).subscribe((res: any) => {
      this.protectedData = res;
      // clean up the inscription references to make it easier for item-info component to read
      for (let reference of this.protectedData.references) {
        reference.reference = reference.publication + ' ' + reference.number;
        if (reference.additional != '' && reference.addtional != null) {
          reference.reference = reference.reference + reference.additional;
        }
      }
      this.protectedNetwork = this.makeNetwork();
      this.loading = false;
    });
  }

  navigate(path: string) {
    this._router.navigate(['/inscriptions/' + path]);
  }

  makeNetwork() {
    var nodes = [];
    var edges = [];
    nodes.push({id: this.protectedData.id, label: this.protectedData.title, group: 'inscriptions'});
    for (let institution of this.protectedData.institutions) {
      nodes.push({id: institution.id, label: institution.title, group: 'institutions'});
      edges.push({from: this.protectedData.id, to: institution.id});
    }
    // track honorIds already found to prevent duplicates
    var foundHonorIds = [];
    for (let person of this.protectedData.people) {
      nodes.push({id: person.id, label: person.title, group: 'people'});
      edges.push({from: this.protectedData.id, to: person.id});
      for (let honor of person.honors) {
        // only add honor if not found before (prevent duplicates)
        if (!foundHonorIds.includes(honor.id)) {
          nodes.push({id: honor.id, label: honor.title, group: 'honors'});
          foundHonorIds.push(honor.id);
        }
        // add edge no matter what
        edges.push({from: person.id, to: honor.id});
      }
    }
    return {
      nodes: nodes,
      edges: edges
    };
  }

}
