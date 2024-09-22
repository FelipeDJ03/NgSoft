import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarSusComponent } from './gestionar-sus.component';

describe('GestionarSusComponent', () => {
  let component: GestionarSusComponent;
  let fixture: ComponentFixture<GestionarSusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarSusComponent]
    });
    fixture = TestBed.createComponent(GestionarSusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
