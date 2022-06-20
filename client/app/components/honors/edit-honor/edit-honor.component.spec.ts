import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHonorComponent } from './edit-honor.component';

describe('EditHonorComponent', () => {
  let component: EditHonorComponent;
  let fixture: ComponentFixture<EditHonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHonorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
