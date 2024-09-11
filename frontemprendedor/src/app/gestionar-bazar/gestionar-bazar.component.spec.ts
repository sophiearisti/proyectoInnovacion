import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarBazarComponent } from './gestionar-bazar.component';

describe('GestionarBazarComponent', () => {
  let component: GestionarBazarComponent;
  let fixture: ComponentFixture<GestionarBazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarBazarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarBazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
