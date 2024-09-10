import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProductoDescripcionComponent } from "../components/nuevo-producto-descripcion/nuevo-producto-descripcion.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";

@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.css'],
  standalone: true,
  imports: [CommonModule, NuevoProductoDescripcionComponent, NavigationBarComponent, UpBarComponent] // Asegúrate de importar CommonModule
 // Asegúrate de importar CommonModule
 // Asegúrate de importar CommonModule
  // Asegúrate de importar CommonModule
})
export class AnadirProductoComponent {
  productos: any[] = [];

  anadirProducto() {
    this.productos.push({});
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
}

