import { Component } from '@angular/core';
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { CommonModule } from '@angular/common'; // Importar esto
import { FormsModule } from '@angular/forms'; // También puedes necesitar FormsModule si usas ngModel

@Component({
  selector: 'app-info-bazar',
  standalone: true,
  imports: [NavigationBarComponent, UpBarComponent,CommonModule,FormsModule],
  templateUrl: './info-bazar.component.html',
  styleUrl: './info-bazar.component.css'
})
export class InfoBazarComponent {

  titulo='Bazar para accesorios hechos a mano'
  fecha='23/09/2024'
  descripcion='Si tu emprendimiento es de accesorios hechos a mano, este bazar es para ti. Logra mejorar la visibilidad de tu marca al participar en este evento gratuito'
  cupos:number=20

  estaInscrito: boolean = false;
  hoverButton: boolean = false;

  inscribirse() {
    if(this.estaInscrito)
    {
      this.estaInscrito = false;
      this.cupos+=1
    }
    else
    {
      this.estaInscrito = true;
      this.cupos-=1
    }
  }

  hover(isHovering: boolean) {
    this.hoverButton = isHovering;
  }
}
