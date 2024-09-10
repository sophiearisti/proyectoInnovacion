import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router) {}

  navegarAInicioDeSesion() {
    this.router.navigate(['/inicio-de-sesion']);
  }

  navegarARegistro() {
    this.router.navigate(['/registro']);
  }
}
