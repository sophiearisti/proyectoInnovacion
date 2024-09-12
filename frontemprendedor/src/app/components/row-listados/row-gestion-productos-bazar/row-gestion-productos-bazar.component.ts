import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-row-gestion-productos-bazar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './row-gestion-productos-bazar.component.html',
  styleUrl: './row-gestion-productos-bazar.component.css'
})
export class RowGestionProductosBazarComponent {
  @Input() producto: any;

  // Método para ajustar valores cuando se cambia el toggle
  toggleProducto() {
    if (!this.producto.incluido) {
      this.producto.costo_evento = this.producto.costo_real;  // Ajusta el precio evento al precio real
      this.producto.cantidad_evento = 0;  // Ajusta la cantidad del evento a 0
    }
  }
}
