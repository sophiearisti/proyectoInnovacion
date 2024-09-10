import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoDescripcionComponent } from './editar-producto-descripcion.component';

describe('EditarProductoDescripcionComponent', () => {
  let component: EditarProductoDescripcionComponent;
  let fixture: ComponentFixture<EditarProductoDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProductoDescripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductoDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
