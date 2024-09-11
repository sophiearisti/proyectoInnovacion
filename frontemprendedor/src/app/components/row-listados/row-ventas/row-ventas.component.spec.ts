import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowVentasComponent } from './row-ventas.component';

describe('RowVentasComponent', () => {
  let component: RowVentasComponent;
  let fixture: ComponentFixture<RowVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
