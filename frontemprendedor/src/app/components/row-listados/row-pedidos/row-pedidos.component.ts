import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-row-pedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './row-pedidos.component.html',
  styleUrl: './row-pedidos.component.css'
})
export class RowPedidosComponent {

  constructor(private router: Router) {}
  @Input() pedido: any;
  @Output() onPedido: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onPedido.emit();
  }

  irInfoPedido()
  {
    this.router.navigate(['pedido']);
  }
}
