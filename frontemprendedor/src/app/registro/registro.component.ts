import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombre: string = '';
  doc: string = '';
  correo: string = '';
  pwrd2: string = '';
  pwrd1: string = '';
  userId: UserCredential | null = null;
  
  constructor(private router: Router, private authService: AuthService) {}
  
  registro() 
  {
    this.authService.signUp(this.correo, this.pwrd1, this.nombre, parseInt(this.doc))
      .then(userId => {
        this.userId = userId;

        console.log('Sign up successful:', this.userId);  

        //guardar el id del usuario en el local storage
        localStorage.setItem('userId', this.userId.user?.uid || '');
 
        this.router.navigate(['/menu']);
      })
      .catch(error => {
        console.error('Error during sign up:', error);
      });
  }

  navegarAInicioDeSesion() {
    this.router.navigate(['/inicio-de-sesion']);
  }
}
