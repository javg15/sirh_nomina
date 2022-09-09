import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionpercAdminComponent } from './categoriasasignacionperc-admin.component';

describe('CategoriasasignacionpercAdminComponent', () => {
  let component: CategoriasasignacionpercAdminComponent;
  let fixture: ComponentFixture<CategoriasasignacionpercAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionpercAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionpercAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
