import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailedAdComponent } from './home-detailed-ad.component';

describe('HomeDetailedAdComponent', () => {
  let component: HomeDetailedAdComponent;
  let fixture: ComponentFixture<HomeDetailedAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDetailedAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeDetailedAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
