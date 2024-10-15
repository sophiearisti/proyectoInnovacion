import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../shared/producto.service';


@Component({
  selector: 'app-row-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './row-inventario.component.html',
  styleUrl: './row-inventario.component.css'
})
export class RowInventarioComponent {
  constructor(private router: Router, private productoService: ProductoService,) {}
  
  @Input() producto: any;
  @Output() onProducto: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onProducto.emit();
  }

  irInfoProducto()
  {
    localStorage.setItem('idProducto', this.producto.idDoc);
    console.error('idProducto:', this.producto.idDoc);
    this.router.navigate(['editar-producto']);
  }

  eliminarProducto()
  {
    console.error('ELIMINAR:', this.producto.idDoc);
    //obtener el id del producto y enviar el id para eliminarlo desde el servicio
    this.productoService.eliminarProducto(this.producto.idDoc);

    //RELOAD PAGE
    this.router.navigateByUrl('/inventario-lista', { skipLocationChange: true }).then(() => {
      this.router.navigate(['inventario-lista']);
    });
  }
}
