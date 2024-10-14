import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { EmprendimientoDTO } from '../model/EmprendimientoDTO';
import { EmprendimientoService} from './emprendimiento.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {

  constructor(private router: Router,private authAuth: Auth, private bazarService:EmprendimientoService) { }

  signUp(email: string, password: string,nombreusuario: string,documento: number): Promise<UserCredential> {
      return createUserWithEmailAndPassword(this.authAuth, email, password)
      .then((userCredential) => {
        // Sign up successful
        //crear un nuevo dato de bazar en la bdd
        this.authAuth.currentUser?.uid;
        const currentUser = userCredential.user.uid;
        if (!currentUser) {
          throw new Error('User not found');
        }
        
        this.bazarService.createEmprendimiento(new EmprendimientoDTO(currentUser, "", "", "", email, nombreusuario, documento, []));
        return userCredential;
      })
      .catch((error) => {
        // An error occurred
        throw new Error(error);
      });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.authAuth,email, password)
    .then((userCredential) => {
      // Sign up successful
      //crear un nuevo dato de bazar en la bdd
      const currentUser = this.authAuth.currentUser;
      if (!currentUser) {
        throw new Error('User not found');
      }
      
      return userCredential;
    })
    .catch((error) => {
      // An error occurred
      throw new Error(error);
    });
  }

  logout(): Promise<boolean> {
    return this.authAuth.signOut()
      .then(() => {
        // Logout successful
        this.router.navigate(['']);
        return true;
      })
      .catch((error) => {
        // An error occurred
        return false;
      });
  }

  get isAuthenticated(): boolean {
    return this.authAuth.currentUser !== null;
  }
}
