import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionComponent } from './add-institution.component';

describe('AddInstitutionComponent', () => {
  let component: AddInstitutionComponent;
  let fixture: ComponentFixture<AddInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
