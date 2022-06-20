import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedTableComponent } from './related-table.component';

describe('RelatedTableComponent', () => {
  let component: RelatedTableComponent;
  let fixture: ComponentFixture<RelatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
