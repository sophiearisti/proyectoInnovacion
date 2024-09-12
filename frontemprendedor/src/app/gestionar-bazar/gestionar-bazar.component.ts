import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { RowGestionProductosBazarComponent } from "../components/row-listados/row-gestion-productos-bazar/row-gestion-productos-bazar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-bazar',
  standalone: true,
  imports: [UpBarComponent, 
    NavigationBarComponent,
    RowGestionProductosBazarComponent,
    CommonModule, 
    FormsModule],
  templateUrl: './gestionar-bazar.component.html',
  styleUrl: './gestionar-bazar.component.css'
})
export class GestionarBazarComponent {

  productos_tabla = [
    { costo_real: '20000', costo_evento: '18000', nombre:'gafas', color:'negro', cantidad_real: 100, cantidad_evento: 20,talla: 'no aplica', imagen:'/images/gafas1.jpg',incluido:true, ID:1},
    { costo_real: '100000', costo_evento: '30000', nombre:'zapatos', color:'no aplica', cantidad_real: 200, cantidad_evento: 30,talla: '42', imagen:'/images/zapatos2.jpg',incluido:true, ID:2},
    { costo_real: '10000', costo_evento: '4000', nombre:'manilla', color:'no aplica', cantidad_real: 200, cantidad_evento: 30,talla: 'M', imagen:'/images/zapatos3.jpg',incluido:true, ID:3},
    { costo_real: '120000', costo_evento: '120000', nombre:'zapatos', color:'no aplica', cantidad_real: 100, cantidad_evento: 0,talla: '43', imagen:'/images/zapatos2.jpg',incluido:false, ID:4},
    { costo_real: '140000', costo_evento: '140000', nombre:'zapatos', color:'no aplica', cantidad_real: 90, cantidad_evento: 0,talla: '32', imagen:'/images/zapatos2.jpg',incluido:false, ID:5},
  ];

  // Esta función ordenará los productos, moviendo los que tienen incluido: false al final
  productos_ordenados() {
      return this.productos_tabla.sort((a, b) => {
          return (a.incluido === b.incluido) ? 0 : a.incluido ? -1 : 1;
      });
  }

  // Método que actualiza la cantidad de evento y el precio cuando se cambia el toggle
  toggleProducto(producto: any) {
      if (!producto.incluido) {
          producto.costo_evento = producto.costo_real; // Ajusta el precio evento al precio real
          producto.cantidad_evento = 0; // Ajusta la cantidad del evento a 0
      }
  }


}
