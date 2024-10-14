import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-up-bar',
  standalone: true,
  imports: [],
  templateUrl: './up-bar.component.html',
  styleUrl: './up-bar.component.css'
})
export class UpBarComponent {
  constructor(private router: Router,private authService: AuthService) {}

  navegarALanding() {
    this.authService.logout();
  }

  navegarACuenta() {
    this.router.navigate(['cuenta']);
  }
}
