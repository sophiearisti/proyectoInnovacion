import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowProductosPedidosComponent } from './row-productos-pedidos.component';

describe('RowProductosPedidosComponent', () => {
  let component: RowProductosPedidosComponent;
  let fixture: ComponentFixture<RowProductosPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowProductosPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowProductosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
