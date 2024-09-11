import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto-descripcion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editar-producto-descripcion.component.html',
  styleUrls: ['./editar-producto-descripcion.component.css']
})
export class EditarProductoDescripcionComponent implements OnChanges {
  @Input() producto: any;
  @Output() onEliminar: EventEmitter<void> = new EventEmitter<void>();

  imageSrc: string | ArrayBuffer | null = '/images/foto.jpg'; // Ruta a la imagen predeterminada

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && this.producto) {
      this.imageSrc = this.producto.imagen || '/images/foto.jpg';
    }
  }

  eliminar() {
    this.onEliminar.emit();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
