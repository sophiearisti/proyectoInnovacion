import { Component } from '@angular/core';
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { RowPedidosComponent } from "../components/row-listados/row-pedidos/row-pedidos.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido-lista',
  standalone: true,
  imports: [NavigationBarComponent, UpBarComponent, RowPedidosComponent,CommonModule,
    FormsModule],
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.css'
})
export class PedidoListaComponent {

  constructor(private router: Router) {}

  pedidos_tabla = [
    {  estado: 'cancelado', costo: '20000', fecha: '12/2/2024', cliente: 'Pedro', ID: '123' },
    {  estado: 'recibido', costo: '40000', fecha: '12/5/2024', cliente: 'Maria', ID: '1234' },
    {  estado: 'enviado', costo: '120000', fecha: '22/2/2024', cliente: 'Jesus', ID: '12345' },
    { estado: 'empacado', costo: '80000', fecha: '12/12/2023', cliente: 'Pamela', ID: '1235'}
  ];

  pedidos: any[] = [];

  verPedido(index: number) {
    this.pedidos_tabla[index].ID;
    this.router.navigate(['pedido']);
  }


}