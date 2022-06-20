import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonorDetailComponent } from './honor-detail.component';

describe('HonorDetailComponent', () => {
  let component: HonorDetailComponent;
  let fixture: ComponentFixture<HonorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HonorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HonorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
