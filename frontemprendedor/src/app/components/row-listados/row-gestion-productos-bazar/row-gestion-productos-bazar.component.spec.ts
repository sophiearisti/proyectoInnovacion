import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowGestionProductosBazarComponent } from './row-gestion-productos-bazar.component';

describe('RowGestionProductosBazarComponent', () => {
  let component: RowGestionProductosBazarComponent;
  let fixture: ComponentFixture<RowGestionProductosBazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowGestionProductosBazarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowGestionProductosBazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
