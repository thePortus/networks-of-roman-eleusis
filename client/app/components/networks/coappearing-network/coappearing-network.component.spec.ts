import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoappearingNetworkComponent } from './coappearing-network.component';

describe('CoappearingNetworkComponent', () => {
  let component: CoappearingNetworkComponent;
  let fixture: ComponentFixture<CoappearingNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoappearingNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoappearingNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
