import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionsubFormComponent } from './formasignacion-form.component';

describe('CategoriasasignacionsubFormComponent', () => {
  let component: CategoriasasignacionsubFormComponent;
  let fixture: ComponentFixture<CategoriasasignacionsubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionsubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionsubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
