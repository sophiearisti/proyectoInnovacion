import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-up-bar',
  standalone: true,
  imports: [],
  templateUrl: './up-bar.component.html',
  styleUrl: './up-bar.component.css'
})
export class UpBarComponent {
  constructor(private router: Router) {}

  navegarALanding() {
    this.router.navigate(['']);
  }
}
