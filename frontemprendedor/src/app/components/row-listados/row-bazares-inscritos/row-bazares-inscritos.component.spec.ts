import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowBazaresInscritosComponent } from './row-bazares-inscritos.component';

describe('RowBazaresInscritosComponent', () => {
  let component: RowBazaresInscritosComponent;
  let fixture: ComponentFixture<RowBazaresInscritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowBazaresInscritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowBazaresInscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
