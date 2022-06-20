import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDetailComponent } from './inscription-detail.component';

describe('InscriptionDetailComponent', () => {
  let component: InscriptionDetailComponent;
  let fixture: ComponentFixture<InscriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
