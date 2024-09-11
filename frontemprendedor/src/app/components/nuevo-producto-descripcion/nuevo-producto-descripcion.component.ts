import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-producto-descripcion',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './nuevo-producto-descripcion.component.html',
  styleUrl: './nuevo-producto-descripcion.component.css'
})
export class NuevoProductoDescripcionComponent {
  @Output() onEliminar: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onEliminar.emit();
  }

  defaultImageSrc: string = '/images/foto.jpg'; // Reemplaza con la ruta de tu imagen predeterminada
  imageSrc: string | ArrayBuffer | null = this.defaultImageSrc;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Asegúrate de que e.target?.result no sea undefined
        if (e.target?.result) {
          this.imageSrc = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
