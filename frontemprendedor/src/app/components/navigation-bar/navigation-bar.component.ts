import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  navegarAPedidos() {
    this.router.navigate(['/pedidos']);
  }

  navegarAVentas() {
    this.router.navigate(['/ventas']);
  }

  navegarABazares() {
    this.router.navigate(['/bazares']);
  }

  navegarABazaresInscritos() {
    this.router.navigate(['/inscritos']);
  }

  navegarAInventario() {
    this.router.navigate(['/inventario']);
  }
}
