import { Component, OnInit } from '@angular/core';

import { Specs } from './specs';

@Component({
  selector: 'app-home-specs',
  templateUrl: './home-specs.component.html',
  styleUrls: ['./home-specs.component.scss']
})
export class HomeSpecsComponent implements OnInit {
  specs = Specs;

  constructor() { }

  ngOnInit(): void {
  }

}
