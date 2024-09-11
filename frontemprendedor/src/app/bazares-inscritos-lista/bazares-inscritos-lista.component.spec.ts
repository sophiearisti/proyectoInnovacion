import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaresInscritosListaComponent } from './bazares-inscritos-lista.component';

describe('BazaresInscritosListaComponent', () => {
  let component: BazaresInscritosListaComponent;
  let fixture: ComponentFixture<BazaresInscritosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BazaresInscritosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BazaresInscritosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
