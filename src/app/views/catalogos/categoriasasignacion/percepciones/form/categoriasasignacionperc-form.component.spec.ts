import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionpercFormComponent } from './categoriasasignacionperc-form.component';

describe('CategoriasasignacionpercFormComponent', () => {
  let component: CategoriasasignacionpercFormComponent;
  let fixture: ComponentFixture<CategoriasasignacionpercFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionpercFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionpercFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
