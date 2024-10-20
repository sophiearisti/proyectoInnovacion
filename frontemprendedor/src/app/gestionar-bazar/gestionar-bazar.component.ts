import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { RowGestionProductosBazarComponent } from "../components/row-listados/row-gestion-productos-bazar/row-gestion-productos-bazar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoDTO } from '../model/ProductoDTO';
import { ProductoService } from '../shared/producto.service';
import { ListaProductosBazarDTO } from '../model/ListaProductosBazarDTO';
import { GestionBazarService } from '../shared/gestion-bazar.service';

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
    { costo_real: '20000', nombre:'gafas', imagen:'/images/gafas1.jpg',incluido:true, ID:"1"},
    { costo_real: '100000', nombre:'zapatos', imagen:'/images/zapatos2.jpg',incluido:true, ID:"2"},
    { costo_real: '10000', nombre:'manilla',  imagen:'/images/zapatos3.jpg',incluido:true, ID:"3"},
    { costo_real: '120000', nombre:'zapatos',  imagen:'/images/zapatos2.jpg',incluido:false, ID:"4"},
    { costo_real: '140000', nombre:'zapatos', imagen:'/images/zapatos2.jpg',incluido:false, ID:"5"},
  ];

  constructor(private productoService: ProductoService, private gestionBazar: GestionBazarService) {}

  listaPorductosBazar : ListaProductosBazarDTO | undefined
  listaProdcutosInventario: ProductoDTO[]= [];

  async ngOnInit()
  {
    //obtener mis productos
    this.listaProdcutosInventario= await this.productoService.obtenerProductosCompletos();

    //obtener mi lista de gestionar bazar
    //si no existe todo debe estar en rojo
    //obtener del local storage el id del bazar
    let idBazar = localStorage.getItem('idBazar');

    if (idBazar) {
      this.listaPorductosBazar = await this.gestionBazar.obtenerProductosBazar(idBazar);
      
      if (!this.listaPorductosBazar) {
        console.error('No se pudo obtener la lista de productos del bazar');
        return;
      }

      this.productos_tabla = [];
      //si si existe es comprarar que los productos que tengo en mi inventario esten en la lista de gestionar bazar
      //recorrer ambas listas y comparar si en la lista de listaProdcutosInventario la descripcion del producto tambien esta en a la descripcion de  listaPorductosBazar
      this.listaProdcutosInventario.forEach(async productoInventario => {
        let incluido = false;
        let img= await this.productoService.obtenerImagen(productoInventario.imagen)

        this.listaPorductosBazar?.productos.forEach(async productoBazar => {
          if (productoInventario.descripcion === productoBazar.descripcion) {
            // Si las descripciones son iguales, imprimir 1
            this.productos_tabla.push({
              costo_real: productoBazar.precio.toString(),
              nombre: productoBazar.nombre,
              imagen: img ?? '/images/default.jpg',
              incluido: true,
              ID: productoBazar.codigo
            });
            incluido = true;
          }
          
        });

        // Si no se encontró el producto en la lista de productos del bazar
        if (!incluido) {
          this.productos_tabla.push({
            costo_real: productoInventario.precio.toString(),
            nombre: productoInventario.nombre,
            imagen: img ?? '/images/default.jpg',
            incluido: false,
            ID: productoInventario.codigo
          });
        }
      });
      //llenar la lsita de productos_tabla
    } else {
      console.error('idBazar is null');
    }

  }

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

  guardar() {

    if (this.listaPorductosBazar) {
      let nuevaListaProductosBazar: ListaProductosBazarDTO = new ListaProductosBazarDTO(this.listaPorductosBazar.idEmpresa,this.listaPorductosBazar.idBazar, []);
  
      //RECORRER LA LISTA DE PRODUCTOS DEL INVENTARIO
      //SI EL PRODUCTO ESTA EN PRODUCTOS_TABLA comparadn por el nombre y el id e incluido:true ENTONCES SE GUARDA EN nuevaListaProductosBazar

      this.listaProdcutosInventario.forEach(productoTabla => {
          //SI EL PRODUCTO ESTA EN PRODUCTOS_TABLA comparadn por el nombre y el id e incluido:true ENTONCES SE GUARDA EN nuevaListaProductosBazar
          this.productos_tabla.forEach(productoTabla2 => {
              if (productoTabla.nombre === productoTabla2.nombre && productoTabla.codigo === productoTabla2.ID && productoTabla2.incluido) {
                  nuevaListaProductosBazar.productos.push(productoTabla);
              }
          });
      });

      console.log('Nueva lista de productos del bazar:', nuevaListaProductosBazar);

      //GUARDAR LA nuevaListaProductosBazar con el servicio
      this.gestionBazar.guardarProductosBazar(nuevaListaProductosBazar);

    } else {
      console.error('listaPorductosBazar is undefined');
      return;
    }
    
  }

}

