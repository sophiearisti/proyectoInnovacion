import { Component } from '@angular/core';
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { RowVentasUnitariasComponent } from "../components/row-listados/row-ventas-unitarias/row-ventas-unitarias.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-venta',
  standalone: true,
  imports: [NavigationBarComponent, UpBarComponent, RowVentasUnitariasComponent,CommonModule,FormsModule],
  templateUrl: './info-venta.component.html',
  styleUrl: './info-venta.component.css'
})
export class InfoVentaComponent {

  ventas_tabla = [
    { costo: '20000', nombre:'zapatos 2', color:'negro', cantidad: 10, talla: 'no aplica', imagen:'/images/zapatos2.jpg', cliente: 'Pepe'},
    { costo: '40000',  nombre:'zapatos', color:'naranja', cantidad: 30, talla: 32, imagen:'/images/zapatos1.jpg', cliente: 'Lucia'},
    { costo: '120000', nombre:'zapatos 3', color:'rojo', cantidad: 11, talla:'no aplica', imagen:'/images/zapatos5.jpg', cliente: 'Pedro'},
  ];

  nombre='Zapatos'
  costo='30000'
  foto='/images/zapatos4.jpg'
  cantidad='51'
}
