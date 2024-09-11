import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazaresListaComponent } from './bazares-lista.component';

describe('BazaresListaComponent', () => {
  let component: BazaresListaComponent;
  let fixture: ComponentFixture<BazaresListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BazaresListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BazaresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
