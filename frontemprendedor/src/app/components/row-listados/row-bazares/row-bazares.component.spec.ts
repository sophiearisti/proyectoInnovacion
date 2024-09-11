import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowBazaresComponent } from './row-bazares.component';

describe('RowBazaresComponent', () => {
  let component: RowBazaresComponent;
  let fixture: ComponentFixture<RowBazaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowBazaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowBazaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
