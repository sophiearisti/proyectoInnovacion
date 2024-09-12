
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
import { InfoBazarComponent } from './info-bazar/info-bazar.component';
import { InfoPedidoComponent } from './info-pedido/info-pedido.component';
import { InfoVentaComponent } from './info-venta/info-venta.component';
import { GestionarBazarComponent } from './gestionar-bazar/gestionar-bazar.component';
import { InfoCuentaComponent } from './info-cuenta/info-cuenta.component';

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
    {path: 'inscritos', component: BazaresInscritosListaComponent},
    {path: 'bazar', component: InfoBazarComponent},
    {path: 'pedido', component: InfoPedidoComponent},
    {path: 'venta', component: InfoVentaComponent},
    {path: 'gestion-bazar', component: GestionarBazarComponent},
    {path: 'cuenta', component: InfoCuentaComponent},
    {path: '', component: LandingComponent},
    {path: '**', component: LandingComponent}
];