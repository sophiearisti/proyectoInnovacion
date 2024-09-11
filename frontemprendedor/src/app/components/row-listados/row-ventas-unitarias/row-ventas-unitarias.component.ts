import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row-ventas-unitarias',
  standalone: true,
  imports: [],
  templateUrl: './row-ventas-unitarias.component.html',
  styleUrl: './row-ventas-unitarias.component.css'
})
export class RowVentasUnitariasComponent {
  @Input() venta: any;
}
