import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-bazares-inscritos',
  standalone: true,
  imports: [],
  templateUrl: './row-bazares-inscritos.component.html',
  styleUrl: './row-bazares-inscritos.component.css'
})
export class RowBazaresInscritosComponent {
  constructor(private router: Router) {}
  @Input() bazar: any;
  @Output() onBazar: EventEmitter<void> = new EventEmitter<void>();

  eliminar() {
    this.onBazar.emit();
  }

  irInfoBazar()
  {
    localStorage.setItem('idBazar', this.bazar.ID);
    console.error('idBazar:', this.bazar.ID);
    this.router.navigate(['bazar']);
  }

  irGestionBazar()
  {
    this.router.navigate(['gestion-bazar']);
  }
}
