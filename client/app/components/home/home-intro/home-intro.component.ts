import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-intro',
  templateUrl: './home-intro.component.html',
  styleUrls: ['./home-intro.component.scss']
})
export class HomeIntroComponent implements OnInit {
  imgs = {
    splash: '/assets/images/intro-1.png',
    intro: '/assets/images/intro-2.png',
    help1: {src: '/assets/images/websitehelp-1.jpg', tmb: '/assets/images/websitehelp-1-tmb.jpg'},
    help2: {src: '/assets/images/websitehelp-2.jpg', tmb: '/assets/images/websitehelp-2-tmb.jpg'},
    help3: {src: '/assets/images/websitehelp-3.jpg', tmb: '/assets/images/websitehelp-3-tmb.jpg'}
  };

  constructor() { }

  ngOnInit(): void {
  }

}
