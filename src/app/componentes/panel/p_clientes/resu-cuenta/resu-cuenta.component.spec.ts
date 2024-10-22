import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuCuentaComponent } from './resu-cuenta.component';

describe('ResuCuentaComponent', () => {
  let component: ResuCuentaComponent;
  let fixture: ComponentFixture<ResuCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResuCuentaComponent]
    });
    fixture = TestBed.createComponent(ResuCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
