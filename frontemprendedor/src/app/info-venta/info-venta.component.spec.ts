import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVentaComponent } from './info-venta.component';

describe('InfoVentaComponent', () => {
  let component: InfoVentaComponent;
  let fixture: ComponentFixture<InfoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
