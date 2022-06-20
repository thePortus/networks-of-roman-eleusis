import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSpecsComponent } from './home-specs.component';

describe('HomeSpecsComponent', () => {
  let component: HomeSpecsComponent;
  let fixture: ComponentFixture<HomeSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSpecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
