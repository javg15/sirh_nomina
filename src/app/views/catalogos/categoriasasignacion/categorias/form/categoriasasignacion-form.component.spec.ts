import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionFormComponent } from './categoriasasignacion-form.component';

describe('CategoriasasignacionFormComponent', () => {
  let component: CategoriasasignacionFormComponent;
  let fixture: ComponentFixture<CategoriasasignacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
