import { Component, OnInit } from '@angular/core';

import { Bibliography } from './bibliography';

@Component({
  selector: 'app-home-bibliography',
  templateUrl: './home-bibliography.component.html',
  styleUrls: ['./home-bibliography.component.scss']
})
export class HomeBibliographyComponent implements OnInit {
  bibliography = Bibliography.sort();

  constructor() { }

  ngOnInit(): void {
  }

}
