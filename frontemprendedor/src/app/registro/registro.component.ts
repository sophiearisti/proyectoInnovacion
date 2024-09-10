import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  constructor(private router: Router) {}
  
  registro() 
  {
    this.router.navigate(['/menu']);
  }

  navegarAInicioDeSesion() {
    this.router.navigate(['/inicio-de-sesion']);
  }
}
