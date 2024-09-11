import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RowVentasComponent } from "../components/row-listados/row-ventas/row-ventas.component";

@Component({
  selector: 'app-ventas-lista',
  standalone: true,
  imports: [UpBarComponent, NavigationBarComponent, CommonModule,
    FormsModule, RowVentasComponent],
  templateUrl: './ventas-lista.component.html',
  styleUrl: './ventas-lista.component.css'
})
export class VentasListaComponent {
  constructor(private router: Router) {}

  ventas_tabla = [
    {  nombre: 'zapatos azules', cantidad: '20000', ID: '123',fecha: '12/2/2024' },
    {  nombre: 'zapatos verdes', cantidad: '40000', ID: '1234',fecha: '12/2/2024' },
    {  nombre: 'zapatos violetas', cantidad: '120000', ID: '12345',fecha: '12/2/2024' },
    { nombre: 'zapatos negros', cantidad: '80000', ID: '1235',fecha: '12/2/2024'}
  ];

  ventas: any[] = [];

  verVenta(index: number) {
    this.ventas_tabla[index].ID;
    this.router.navigate(['venta']);
  }
}
