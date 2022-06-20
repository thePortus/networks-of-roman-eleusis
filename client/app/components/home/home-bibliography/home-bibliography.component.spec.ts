import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBibliographyComponent } from './home-bibliography.component';

describe('HomeBibliographyComponent', () => {
  let component: HomeBibliographyComponent;
  let fixture: ComponentFixture<HomeBibliographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBibliographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBibliographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
