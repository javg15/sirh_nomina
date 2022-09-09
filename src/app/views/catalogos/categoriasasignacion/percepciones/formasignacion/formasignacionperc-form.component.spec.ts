import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasasignacionpercsubFormComponent } from './formasignacionperc-form.component';

describe('CategoriasasignacionpercsubFormComponent', () => {
  let component: CategoriasasignacionpercsubFormComponent;
  let fixture: ComponentFixture<CategoriasasignacionpercsubFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasasignacionpercsubFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasasignacionpercsubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
