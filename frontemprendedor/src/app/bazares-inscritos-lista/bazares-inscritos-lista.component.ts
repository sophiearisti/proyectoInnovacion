import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RowBazaresInscritosComponent } from "../components/row-listados/row-bazares-inscritos/row-bazares-inscritos.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";

@Component({
  selector: 'app-bazares-inscritos-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RowBazaresInscritosComponent, NavigationBarComponent, UpBarComponent],
  templateUrl: './bazares-inscritos-lista.component.html',
  styleUrl: './bazares-inscritos-lista.component.css'
})
export class BazaresInscritosListaComponent {
  constructor(private router: Router) {}
  
  bazares_tabla = [
    {  nombre: 'eva', ID: '123',fecha: '12/2/2024', cupos: 94 },
    {  nombre: 'vassar', ID: '1234',fecha: '12/2/2024',cupos: 78 },
    {  nombre: 'bazar all', ID: '12345',fecha: '12/2/2024', cupos: 100 },
  ];

  bazares: any[] = [];

  verBazar(index: number) {
    this.bazares_tabla[index].ID;
    this.router.navigate(['bazar']);
  }
}
