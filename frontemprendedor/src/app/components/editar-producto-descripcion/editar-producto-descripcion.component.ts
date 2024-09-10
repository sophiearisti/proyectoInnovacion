import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editar-producto-descripcion',
  standalone: true,
  imports: [],
  templateUrl: './editar-producto-descripcion.component.html',
  styleUrl: './editar-producto-descripcion.component.css'
})
export class EditarProductoDescripcionComponent {
  
  @Output() onEliminar: EventEmitter<void> = new EventEmitter<void>();

  eliminar() 
  {
    this.onEliminar.emit();
  }
}
