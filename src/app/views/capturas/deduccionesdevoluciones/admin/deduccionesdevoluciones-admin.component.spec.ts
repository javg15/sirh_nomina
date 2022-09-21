import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeduccionesdevolucionesAdminComponent } from './deduccionesdevoluciones-admin.component';

describe('DeduccionesdevolucionesAdminComponent', () => {
  let component: DeduccionesdevolucionesAdminComponent;
  let fixture: ComponentFixture<DeduccionesdevolucionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeduccionesdevolucionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeduccionesdevolucionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
