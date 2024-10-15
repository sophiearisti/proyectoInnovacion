import { Component } from '@angular/core';
import { RowInventarioComponent } from "../components/row-listados/row-inventario/row-inventario.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../shared/producto.service';
import { ProductoLista } from '../model/ProductoLista';


@Component({
  selector: 'app-inventario-lista',
  standalone: true,
  imports: [RowInventarioComponent, NavigationBarComponent, UpBarComponent, CommonModule,
    FormsModule,],
  templateUrl: './inventario-lista.component.html',
  styleUrl: './inventario-lista.component.css'
})
export class InventarioListaComponent {
  constructor(private router: Router,private productoService: ProductoService) {}

  productos_tabla = [
    {  nombre: 'zapatos azules', cantidad: '20000', ID: '123', costo: 2000, idDoc: '123'},
    {  nombre: 'zapatos verdes', cantidad: '40000', ID: '1234', costo: 4000, idDoc: '123'},
    {  nombre: 'zapatos violetas', cantidad: '120000', ID: '12345', costo: 6000, idDoc: '123' },
    { nombre: 'zapatos negros', cantidad: '80000', ID: '1235', costo: 9000, idDoc: '123'}
  ];

  async ngOnInit() {
    try {
      // Obtener la lista de productos desde el servicio
      const lista: ProductoLista[] = await this.productoService.obtenerProductos();

      // Recorrer la lista y formatear cada producto
      this.productos_tabla = lista.map(producto => ({
        nombre: producto.nombre,              // Tomamos el nombre del producto
        cantidad: Math.floor(Math.random() * 100).toString(),  // Asignamos un valor aleatorio para la cantidad
        ID: producto.codigo,                   // Usamos el id del documento como ID
        costo: producto.precio,            // Asignamos el costo/precio del producto
        idDoc:producto.idDoc
      }));
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
    
  ventas: any[] = [];

  verProducto(index: number) {
    //guardar el  this.productos_tabla[index].idDoc; en el localstorage
    localStorage.setItem('idProducto', this.productos_tabla[index].idDoc);
    this.router.navigate(['venta']);
  }

  anadirProducto()
  {
    this.router.navigate(['nuevo-producto']);
  }
}
