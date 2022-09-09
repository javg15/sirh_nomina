import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionAdminComponent } from './categoriasasignacion-admin.component';

describe('CategoriasasignacionAdminComponent', () => {
  let component: CategoriasasignacionAdminComponent;
  let fixture: ComponentFixture<CategoriasasignacionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
