import { Component } from '@angular/core';
import { RowInventarioComponent } from "../components/row-listados/row-inventario/row-inventario.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventario-lista',
  standalone: true,
  imports: [RowInventarioComponent, NavigationBarComponent, UpBarComponent, CommonModule,
    FormsModule,],
  templateUrl: './inventario-lista.component.html',
  styleUrl: './inventario-lista.component.css'
})
export class InventarioListaComponent {
  constructor(private router: Router) {}

  productos_tabla = [
    {  nombre: 'zapatos azules', cantidad: '20000', ID: '123', costo: 2000 },
    {  nombre: 'zapatos verdes', cantidad: '40000', ID: '1234', costo: 4000},
    {  nombre: 'zapatos violetas', cantidad: '120000', ID: '12345', costo: 6000 },
    { nombre: 'zapatos negros', cantidad: '80000', ID: '1235', costo: 9000}
  ];

  ventas: any[] = [];

  verProducto(index: number) {
    this.productos_tabla[index].ID;
    this.router.navigate(['venta']);
  }

  anadirProducto()
  {
    this.router.navigate(['nuevo-producto']);
  }
}
