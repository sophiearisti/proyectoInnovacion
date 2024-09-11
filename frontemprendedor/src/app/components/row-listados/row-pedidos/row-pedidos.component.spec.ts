import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPedidosComponent } from './row-pedidos.component';

describe('RowPedidosComponent', () => {
  let component: RowPedidosComponent;
  let fixture: ComponentFixture<RowPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
