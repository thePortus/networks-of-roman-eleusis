import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHonorComponent } from './add-honor.component';

describe('AddHonorComponent', () => {
  let component: AddHonorComponent;
  let fixture: ComponentFixture<AddHonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHonorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
