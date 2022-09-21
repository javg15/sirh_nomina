import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeduccionesdevolucionesFormComponent } from './deduccionesdevoluciones-form.component';

describe('DeduccionesdevolucionesFormComponent', () => {
  let component: DeduccionesdevolucionesFormComponent;
  let fixture: ComponentFixture<DeduccionesdevolucionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeduccionesdevolucionesFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeduccionesdevolucionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
