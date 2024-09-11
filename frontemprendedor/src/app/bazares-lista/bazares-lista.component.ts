import { Component } from '@angular/core';
import { RowBazaresComponent } from "../components/row-listados/row-bazares/row-bazares.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bazares-lista',
  standalone: true,
  imports: [RowBazaresComponent, NavigationBarComponent, UpBarComponent,CommonModule,FormsModule],
  templateUrl: './bazares-lista.component.html',
  styleUrl: './bazares-lista.component.css'
})
export class BazaresListaComponent {
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
