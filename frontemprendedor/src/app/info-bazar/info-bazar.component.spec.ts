import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBazarComponent } from './info-bazar.component';

describe('InfoBazarComponent', () => {
  let component: InfoBazarComponent;
  let fixture: ComponentFixture<InfoBazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBazarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
