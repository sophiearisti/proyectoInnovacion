
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { MenuComponent } from './menu/menu.component';
import { AnadirProductoComponent } from './anadir-producto/anadir-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

export const routes: Routes = [
    {path: 'inicio-de-sesion', component: IniciarSesionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'nuevo-producto', component: AnadirProductoComponent},
    {path: 'editar-producto', component: EditarProductoComponent},
    {path: '**', component: LandingComponent},
];