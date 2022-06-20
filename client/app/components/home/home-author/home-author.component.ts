import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-author',
  templateUrl: './home-author.component.html',
  styleUrls: ['./home-author.component.scss']
})
export class HomeAuthorComponent implements OnInit {
  images = {
    'author': 'assets/images/author.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
