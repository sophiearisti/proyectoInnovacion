import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowInventarioComponent } from './row-inventario.component';

describe('RowInventarioComponent', () => {
  let component: RowInventarioComponent;
  let fixture: ComponentFixture<RowInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
