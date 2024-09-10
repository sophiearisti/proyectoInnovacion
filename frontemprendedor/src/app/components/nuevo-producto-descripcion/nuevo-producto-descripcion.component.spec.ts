import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoDescripcionComponent } from './nuevo-producto-descripcion.component';

describe('NuevoProductoDescripcionComponent', () => {
  let component: NuevoProductoDescripcionComponent;
  let fixture: ComponentFixture<NuevoProductoDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoProductoDescripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoProductoDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
