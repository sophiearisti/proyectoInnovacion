import { Component, inject } from '@angular/core';
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { CommonModule } from '@angular/common'; // Importar esto
import { FormsModule } from '@angular/forms'; // También puedes necesitar FormsModule si usas ngModel
import { BazarService } from '../shared/bazar.service';
import { Auth } from '@angular/fire/auth';
import { Firestore, Timestamp,  } from "@angular/fire/firestore";
import { BazarDTO2 } from '../model/BazarDTO2';
import { GestionBazarService } from '../shared/gestion-bazar.service';

@Component({
  selector: 'app-info-bazar',
  standalone: true,
  imports: [NavigationBarComponent, UpBarComponent,CommonModule,FormsModule],
  templateUrl: './info-bazar.component.html',
  styleUrl: './info-bazar.component.css'
})
export class InfoBazarComponent {

  constructor(private bazarService: BazarService, private authAuth: Auth, private gestionService: GestionBazarService) {}

  fireStore = inject(Firestore);
  uid: string | undefined;

  titulo='Bazar para accesorios hechos a mano'
  fecha='23/09/2024'
  descripcion='Si tu emprendimiento es de accesorios hechos a mano, este bazar es para ti. Logra mejorar la visibilidad de tu marca al participar en este evento gratuito'
  cupos:number=20

  estaInscrito: boolean = false;
  hoverButton: boolean = false;

  idBazar: string| null=""

  bazar: BazarDTO2 = new BazarDTO2("", "",0, [], "", new Timestamp(0, 0), new Timestamp(0, 0));

  ngOnInit() {
    //obtener el uid del usuario
    

    // Obtener por el console log el id del bazar
    this.idBazar = localStorage.getItem('idBazar');
    console.log('ID BAZAR:', localStorage.getItem('idBazar'));

    if (this.idBazar) {
      this.bazarService.obtenerBazar(this.idBazar).then(async (bazar) => {
        //asignar cada campo donde debe ir
        if (bazar) {
          this.bazar=bazar;
          this.titulo = bazar.nombre;
          this.descripcion = bazar.descripcion;
          this.fecha = new Date(bazar.fechaInicio.seconds * 1000).toLocaleDateString('es-ES');
          this.cupos = bazar.cantMax-bazar.empresas.length;

          //evaluar si el usuario esta inscrito
          this.estaInscrito = bazar.empresas.includes(this.authAuth.currentUser?.uid || '');

          console.log('estaInscrito:', this.estaInscrito    );

        } else {
          console.error('Producto is undefined');
        }
        
      });
    } else {
      console.error('idBazar is null');
    }


    
  }

  inscribirse() {
    if(this.estaInscrito)
    {
      //editar el bazar y quitarle una empresa en la lista de empresas
      //quitar de la lsita de empresas la que su valor es el uid del usuario
      this.bazar.empresas = this.bazar.empresas.filter(empresa => empresa !== this.authAuth.currentUser?.uid);  

      //actualizar el bazar 
      this.bazarService.editBazar(this.bazar, this.idBazar || '');

      //eliminar gestion bazar
      this.gestionService.eliminarProductosBazar(this.idBazar || '');

      this.estaInscrito = false;
      this.cupos+=1
    }
    else
    {
      //editar el bazar y anadirle una empresa en la lsita de empresas
      this.bazar.empresas.push(this.authAuth.currentUser?.uid || '');

      this.bazarService.editBazar(this.bazar, this.idBazar || '');

      this.gestionService.crearGestion(this.idBazar || '');

      this.estaInscrito = true;
      this.cupos-=1
    }
  }

  hover(isHovering: boolean) {
    this.hoverButton = isHovering;
  }
}
