import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraCanceladaComponent } from './compra-cancelada.component';

describe('CompraCanceladaComponent', () => {
  let component: CompraCanceladaComponent;
  let fixture: ComponentFixture<CompraCanceladaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraCanceladaComponent]
    });
    fixture = TestBed.createComponent(CompraCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
