import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Variante } from '../../model/Variante'; // Asegúrate de importar la clase Variante
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-nuevo-producto-descripcion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './nuevo-producto-descripcion.component.html',
  styleUrls: ['./nuevo-producto-descripcion.component.css']
})
export class NuevoProductoDescripcionComponent {

  @Output() onEliminar: EventEmitter<void> = new EventEmitter<void>();
  @Output() varianteActualizada: EventEmitter<Variante> = new EventEmitter<Variante>();

  nombre: string = '';
  color: string = 'no-aplica';
  talla: string = 'no-aplica';
  cant: number = 0;
  imageSrc: string | ArrayBuffer | null = '/images/foto.jpg'; // Imagen predeterminada
  imagen: string = ''; // Aquí almacenamos la imagen como base64 o URL
  codigo: string = '';

  // Método para manejar el cambio de la imagen
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result;
          this.imagen = e.target.result as string; // Guardar imagen
          this.emitirVarianteActualizada();
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Emitir los datos actualizados de la variante
  emitirVarianteActualizada() {
    const variante = new Variante(this.nombre, this.imagen, this.color, this.talla, this.cant,this.codigo);
    this.varianteActualizada.emit(variante);
  }

  // Método para eliminar el componente
  eliminar() {
    this.onEliminar.emit();
  }

  // Cada vez que haya cambios, se emite la variante actualizada
  onNombreChange() {
    this.emitirVarianteActualizada();
  }

  onColorChange() {
    this.emitirVarianteActualizada();
  }

  onTallaChange() {
    this.emitirVarianteActualizada();
  }

  onCantidadChange() {
    this.emitirVarianteActualizada();
  }

  onCodigoChange() {
    this.emitirVarianteActualizada();
  }
}
