import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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
    private _router: Router,
    private titleService: Title
  ) {

    /** START : Code to Track Page View using gtag.js */
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
      });
    });
    /** END : Code to Track Page View  using gtag.js */

    //Add dynamic title for selected pages - Start
    _router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        var title = this.getTitle(_router.routerState, _router.routerState.root).join(' > ');
        titleService.setTitle(title);
      }
    });
    //Add dynamic title for selected pages - End
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

}
