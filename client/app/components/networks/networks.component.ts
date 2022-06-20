import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {
  networks = [{
    id: 'sponsor_to_honorand',
    label: 'Sponsors and their Honorands',
    description: 'A network of institutions and people sponsoring inscriptions, and those honored on the inscriptions. Nodes are joined when one party sponsored an inscription of the other party.'
  }, {
    id: 'sponsor_to_appearing',
    label: 'Sponsors and People on their Inscriptions',
    description: 'A network of institutions and people sponsoring inscriptions, and anyone who appears on their inscription. Nodes are joined when one party sponsored an inscription in which the other party appears.'
  }, {
    id: 'coappearances',
    label: 'Institutions and People Coappearing on Inscriptions',
    description: 'A network of institutions and people appearing on inscriptions. Nodes are joined when parties appear in the same inscription.'
  }];

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(path: string) {
    this._router.navigate(['/networks/' + path]);
  }

}
