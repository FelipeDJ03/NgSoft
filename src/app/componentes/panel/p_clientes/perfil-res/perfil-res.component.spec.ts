import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilResComponent } from './perfil-res.component';

describe('PerfilResComponent', () => {
  let component: PerfilResComponent;
  let fixture: ComponentFixture<PerfilResComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilResComponent]
    });
    fixture = TestBed.createComponent(PerfilResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
