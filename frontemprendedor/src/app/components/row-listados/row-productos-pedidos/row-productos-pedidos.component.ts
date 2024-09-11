import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row-productos-pedidos',
  standalone: true,
  imports: [],
  templateUrl: './row-productos-pedidos.component.html',
  styleUrl: './row-productos-pedidos.component.css'
})
export class RowProductosPedidosComponent {
  @Input() pedido: any;
}
