
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { MenuComponent } from './menu/menu.component';
import { AnadirProductoComponent } from './anadir-producto/anadir-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { VentasListaComponent } from './ventas-lista/ventas-lista.component';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { BazaresListaComponent } from './bazares-lista/bazares-lista.component';
import { BazaresInscritosListaComponent } from './bazares-inscritos-lista/bazares-inscritos-lista.component';

export const routes: Routes = [
    {path: 'inicio-de-sesion', component: IniciarSesionComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'nuevo-producto', component: AnadirProductoComponent},
    {path: 'editar-producto', component: EditarProductoComponent},
    {path: 'ventas', component: VentasListaComponent},
    {path: 'inventario', component: InventarioListaComponent},
    {path: 'pedidos', component: PedidoListaComponent},
    {path: 'bazares', component: BazaresListaComponent},
    {path: 'bazares-inscritos', component: BazaresInscritosListaComponent},
    {path: '', component: LandingComponent},
    {path: '**', component: LandingComponent},
];