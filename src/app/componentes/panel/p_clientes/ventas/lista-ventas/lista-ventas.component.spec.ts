import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVentasComponent } from './lista-ventas.component';

describe('ListaVentasComponent', () => {
  let component: ListaVentasComponent;
  let fixture: ComponentFixture<ListaVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaVentasComponent]
    });
    fixture = TestBed.createComponent(ListaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
