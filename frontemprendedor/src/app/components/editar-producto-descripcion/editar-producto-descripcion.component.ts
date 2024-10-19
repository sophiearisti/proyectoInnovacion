import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Variante } from '../../model/Variante';
import { ProductoService } from '../../shared/producto.service';

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
  @Output() varianteActualizada: EventEmitter<Variante> = new EventEmitter<Variante>();

  imageSrc: string | ArrayBuffer | null = '/images/foto.jpg'; // Ruta a la imagen predeterminada

  constructor(private productoService: ProductoService,) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && this.producto) {
      this.imageSrc = this.producto.imagen || '/images/foto.jpg';
    }
  }
    
  // Método para manejar el cambio de la imagen
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result;
          this.producto.imagen = e.target.result as string; // Guardar imagen
          this.emitirVarianteActualizada();
        }
      };

      reader.readAsDataURL(file);
    }
  }

originalNombre: string='';
originalCodigo: string='';
originalColor: string='';
originalTalla: string='';
originalCantidad: number=0;

ngOnInit() {
  // Almacenar los valores originales para la comparación
  this.originalNombre = this.producto.nombre;
  this.originalCodigo = this.producto.codigo;
  this.originalColor = this.producto.color;
  this.originalTalla = this.producto.talla;
  this.originalCantidad = this.producto.cantidad;
}

onNombreChange() {
  if (this.producto.nombre !== this.originalNombre) {
    console.log("El nombre ha cambiado:", this.producto.nombre);
    // Aquí puedes ejecutar la lógica que necesites cuando cambie el nombre
    this.emitirVarianteActualizada();
  }
}

onCodigoChange() {
  if (this.producto.codigo !== this.originalCodigo) {
    console.log("El código ha cambiado:", this.producto.codigo);
    // Aquí puedes ejecutar la lógica que necesites cuando cambie el código
    this.emitirVarianteActualizada();
  }
}

onColorChange() {
  if (this.producto.color !== this.originalColor) {
    console.log("El color ha cambiado:", this.producto.color);
    // Aquí puedes ejecutar la lógica que necesites cuando cambie el color
    this.emitirVarianteActualizada();
  }
}

onTallaChange() {
  if (this.producto.talla !== this.originalTalla) {
    console.log("La talla ha cambiado:", this.producto.talla);
    // Aquí puedes ejecutar la lógica que necesites cuando cambie la talla
  }
}

onCantidadChange() {
  if (this.producto.cantidad !== this.originalCantidad) {
    console.log("La cantidad ha cambiado:", this.producto.cantidad);
    // Aquí puedes ejecutar la lógica que necesites cuando cambie la cantidad
  }
}

  // Emitir los datos actualizados de la variante
  emitirVarianteActualizada() {
    const variante = new Variante(this.producto.nombre, this.producto.imagen,this.producto.imagenDir, this.producto.color, this.producto.talla, Number(this.producto.cantidad), this.producto.codigo);
    this.varianteActualizada.emit(variante);
  }

  // Método para eliminar el componente
  eliminar() {
    this.onEliminar.emit();
  }

  // Cada vez que haya cambios, se emite la variante actualizada
  
}
