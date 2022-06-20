import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-sponsors-to-appearing-network',
  templateUrl: './sponsors-to-appearing-network.component.html',
  styleUrls: ['./sponsors-to-appearing-network.component.scss']
})
export class SponsorsToAppearingNetworkComponent implements OnInit {
  loading: boolean = true;
  protectedData: any;
  options = {
    height: '800px',
    width: '1100px',
    nodes: {
      font: {
        size: 40
      }
    }
  };

  constructor(
    private _router: Router,
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this._api.getTypeRequest('networks/sponsor_to_appearing').subscribe((res: any) => {
      this.protectedData = res;
      this.loading = false;
    });
  }

  navigate() {
    this._router.navigate(['/networks/']);
  }

}
