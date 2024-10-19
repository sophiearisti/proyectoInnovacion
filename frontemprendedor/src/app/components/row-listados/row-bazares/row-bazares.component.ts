import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-bazares',
  standalone: true,
  imports: [],
  templateUrl: './row-bazares.component.html',
  styleUrl: './row-bazares.component.css'
})
export class RowBazaresComponent {
  constructor(private router: Router) {}
  @Input() bazar: any;
  @Output() onBazar: EventEmitter<void> = new EventEmitter<void>();

  irInfoBazar()
  {
    localStorage.setItem('idBazar', this.bazar.ID);
    console.error('idBazar:', this.bazar.ID);
    this.router.navigate(['bazar']);
  }
}
