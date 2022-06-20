import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsToAppearingNetworkComponent } from './sponsors-to-appearing-network.component';

describe('SponsorsToAppearingNetworkComponent', () => {
  let component: SponsorsToAppearingNetworkComponent;
  let fixture: ComponentFixture<SponsorsToAppearingNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorsToAppearingNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsToAppearingNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
