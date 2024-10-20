import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { RowProductosPedidosComponent } from "../components/row-listados/row-productos-pedidos/row-productos-pedidos.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompraService } from '../shared/compra.service';
import { Compra } from '../model/CompraDTO';
import { Timestamp } from 'firebase/firestore';
import { ProductoService } from '../shared/producto.service';
import { ProductoDTO } from '../model/ProductoDTO';
import { ProductoCompra } from '../model/ProductoCompra';

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

  constructor(private compraService: CompraService, private productoService:ProductoService) {}

  nombre='Pepito'
  fecha='10/10/2024'
  direccion='cl 145 no.58c-80'
  adicionales='cuidado con el pedido'
  responsable='Pepita'
  idCompra: string| null=""
  compra:Compra = new Compra('','',0,new Timestamp(0, 0),'',[],'','','')

  estado='enviado'

  ngOnInit() {
    this.idCompra = localStorage.getItem('idCompra');
    console.log('ID BAZAR:', localStorage.getItem('idCompra'));

    if (this.idCompra) {

        this.compraService.obtenerCompra(this.idCompra).then(async (compra) => {
          //asignar cada campo donde debe ir
          if (compra) {
            this.pedidos_tabla=[]
            this.compra=compra;
            this.nombre = compra.nombreCliente;
            this.fecha = new Date(compra.fechaCompra.seconds * 1000).toLocaleDateString('es-ES');
            this.direccion = compra.direccion;
            this.adicionales = compra.datosAdicionales;
            this.responsable = compra.responsable;
            this.estado = compra.estado;
            
            // Recorrer la lista de productos de la compra
            compra.productos.map((producto: ProductoCompra) => {
              // Llamada al servicio para obtener detalles del producto
              this.productoService.obtenerProducto(producto.idProducto).then(async (product2) => {
                // Asignar cada campo donde debe ir
                if (product2) {
                  this.pedidos_tabla.push({
                    costo: product2.precio.toString(),
                    nombre: product2.variantes[producto.posicion].nombre,  // nombre desde el producto obtenido del servicio
                    color: product2.variantes[producto.posicion].color,    // color desde el producto de la compra
                    cantidad: producto.cantidad,  // cantidad desde el producto de la compra
                    talla: product2.variantes[producto.posicion].talla,    // talla desde el producto de la compra
                    imagen: product2.variantes[producto.posicion].imagen  // acceder a la variante correcta según la posición
                  });
                } else {
                  console.error('Producto is undefined');
                }
              }).catch(error => {
                console.error('Error obteniendo el producto:', error);
              });
            });

              //cerrar el map  
          } else {
            console.error('Producto is undefined');
          }
          
        });
      } else {
        console.error('idBazar is null');
      }
  }

  Editar(): void {
    console.log(`El estado seleccionado es: ${this.estado}`);
    this.compra.estado = this.estado;
    this.idCompra = localStorage.getItem('idCompra');
    console.log('ID BAZAR:', localStorage.getItem('idCompra'));
    this.compraService.editCompra(this.compra, this.idCompra || '');
  }
  
}


