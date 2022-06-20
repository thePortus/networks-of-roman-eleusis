import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthorComponent } from './home-author.component';

describe('HomeAuthorComponent', () => {
  let component: HomeAuthorComponent;
  let fixture: ComponentFixture<HomeAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
