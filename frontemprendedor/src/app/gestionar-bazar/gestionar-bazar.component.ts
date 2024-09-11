import { Component } from '@angular/core';
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-gestionar-bazar',
  standalone: true,
  imports: [UpBarComponent, NavigationBarComponent],
  templateUrl: './gestionar-bazar.component.html',
  styleUrl: './gestionar-bazar.component.css'
})
export class GestionarBazarComponent {

}
