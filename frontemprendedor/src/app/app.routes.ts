
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {path: 'inicio-de-sesion', component: IniciarSesionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'menu', component: MenuComponent},
    {path: '**', component: LandingComponent},
];