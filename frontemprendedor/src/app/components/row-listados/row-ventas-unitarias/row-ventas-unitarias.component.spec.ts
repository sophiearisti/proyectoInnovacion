import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowVentasUnitariasComponent } from './row-ventas-unitarias.component';

describe('RowVentasUnitariasComponent', () => {
  let component: RowVentasUnitariasComponent;
  let fixture: ComponentFixture<RowVentasUnitariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowVentasUnitariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowVentasUnitariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
