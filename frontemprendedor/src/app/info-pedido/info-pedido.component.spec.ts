import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPedidoComponent } from './info-pedido.component';

describe('InfoPedidoComponent', () => {
  let component: InfoPedidoComponent;
  let fixture: ComponentFixture<InfoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
