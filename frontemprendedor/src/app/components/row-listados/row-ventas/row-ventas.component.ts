import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-ventas',
  standalone: true,
  imports: [],
  templateUrl: './row-ventas.component.html',
  styleUrl: './row-ventas.component.css'
})
export class RowVentasComponent {
  constructor(private router: Router) {}
  @Input() venta: any;
  @Output() onVenta: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onVenta.emit();
  }

  irInfoVenta()
  {
    this.router.navigate(['venta']);
  }
}
