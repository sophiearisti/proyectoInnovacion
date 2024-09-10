import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  constructor(private router: Router) {}
  
  iniciosesion() 
  {
    this.router.navigate(['/menu']);
  }

  navegarARegistro() {
    this.router.navigate(['/registro']);
  }
}
