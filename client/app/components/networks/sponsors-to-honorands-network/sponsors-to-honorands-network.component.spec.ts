import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsToHonorandsNetworkComponent } from './sponsors-to-honorands-network.component';

describe('SponsorsToHonorandsNetworkComponent', () => {
  let component: SponsorsToHonorandsNetworkComponent;
  let fixture: ComponentFixture<SponsorsToHonorandsNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorsToHonorandsNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsToHonorandsNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
