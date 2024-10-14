import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  constructor(private router: Router,private authService: AuthService) {}
  
  pwrd: string = '';
  correo: string = '';
  iniciosesion() 
  {
    this.authService.login(this.correo, this.pwrd)
      .then(userId => {
        console.log('Sign up successful:', userId);  
        localStorage.setItem('userId', userId.user?.uid || '');
        this.router.navigate(['/menu']);
      })
      .catch(error => {
        console.error('Error during sign up:', error);
      });
    this.router.navigate(['/menu']);
  }

  navegarARegistro() {
    this.router.navigate(['/registro']);
  }
}
