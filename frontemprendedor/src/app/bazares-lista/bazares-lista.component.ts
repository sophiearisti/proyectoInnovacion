import { Component } from '@angular/core';
import { RowBazaresComponent } from "../components/row-listados/row-bazares/row-bazares.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BazarDTO } from '../model/BazarDTO';
import { BazarService } from '../shared/bazar.service';
import { BazarLista } from '../model/BazarLista';


@Component({
  selector: 'app-bazares-lista',
  standalone: true,
  imports: [RowBazaresComponent, NavigationBarComponent, UpBarComponent,CommonModule,FormsModule],
  templateUrl: './bazares-lista.component.html',
  styleUrl: './bazares-lista.component.css'
})
export class BazaresListaComponent {
  constructor(private router: Router, private bazarService: BazarService) {}
  
  bazares_tabla = [
    {  nombre: 'eva', ID: '123',fecha: '12/2/2024', cupos: 94 },
    {  nombre: 'vassar', ID: '1234',fecha: '12/2/2024',cupos: 78 },
    {  nombre: 'bazar all', ID: '1234',fecha: '12/2/2024', cupos: 100 },
  ];

  bazares: BazarDTO[] = [];

  verBazar(index: number) {
   
  }

  async ngOnInit() {
    const lista: BazarLista[] = await this.bazarService.obtenerBazares();
    console.log(lista);

    const currentDate = new Date(); // Fecha actual

    this.bazares_tabla = lista
      .filter(bazar => new Date(bazar.fechaInicio.seconds * 1000) > currentDate) // Filtrar por fecha mayor a la actual
      .map(bazar => ({
        nombre: bazar.nombre,
        ID: bazar.codigo,
        fecha: new Date(bazar.fechaInicio.seconds * 1000).toLocaleDateString('es-ES'), // Formato de fecha
        cupos: bazar.cupos
      }));
  }

  //funcion para obtener todos los bazares y listarlos


  //funciona para obtener cupos disponibles de un bazar


}
