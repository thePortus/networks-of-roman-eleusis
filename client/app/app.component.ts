import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

// declaration of gtag function (defined in index.html <head>)
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'networks-of-roman-eleusis';

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.setUpAnalytics();
  }

  setUpAnalytics() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-YOUR-GOOGLE-ID',
          {
            page_path: event.urlAfterRedirects
          }
        );
      });
  }
}
