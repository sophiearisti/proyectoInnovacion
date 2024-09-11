import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { RowProductosPedidosComponent } from "../components/row-listados/row-productos-pedidos/row-productos-pedidos.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-pedido',
  standalone: true,
  imports: [UpBarComponent, NavigationBarComponent, RowProductosPedidosComponent,CommonModule,FormsModule],
  templateUrl: './info-pedido.component.html',
  styleUrl: './info-pedido.component.css'
})
export class InfoPedidoComponent {
  pedidos_tabla = [
    { costo: '20000', nombre:'gafas', color:'negro', cantidad: 1, talla: 'no aplica', imagen:'/images/gafas1.jpg' },
    { costo: '40000',  nombre:'zapatos', color:'naranja', cantidad: 1, talla: 32, imagen:'/images/zapatos1.jpg'},
    { costo: '120000', nombre:'gafas', color:'rojo', cantidad: 1, talla:'no aplica', imagen:'/images/gafas2.jpg'},
  ];

  nombre='Pepito'
  fecha='10/10/2024'
  direccion='cl 145 no.58c-80'
  adicionales='cuidado con el pedido'
  responsable='Pepita'
}


