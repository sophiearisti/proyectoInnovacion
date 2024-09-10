import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nuevo-producto-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './nuevo-producto-descripcion.component.html',
  styleUrl: './nuevo-producto-descripcion.component.css'
})
export class NuevoProductoDescripcionComponent {
  @Output() onEliminar: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onEliminar.emit();
  }
}
