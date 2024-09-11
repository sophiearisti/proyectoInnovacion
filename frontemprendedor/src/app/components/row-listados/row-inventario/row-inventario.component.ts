import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-row-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './row-inventario.component.html',
  styleUrl: './row-inventario.component.css'
})
export class RowInventarioComponent {
  constructor(private router: Router) {}
  @Input() producto: any;
  @Output() onProducto: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onProducto.emit();
  }

  irInfoProducto()
  {
    this.router.navigate(['editar-producto']);
  }
}
