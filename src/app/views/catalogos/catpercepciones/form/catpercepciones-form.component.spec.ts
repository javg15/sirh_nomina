import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpercepcionesFormComponent } from './catpercepciones-form.component';

describe('CatpercepcionesFormComponent', () => {
  let component: CatpercepcionesFormComponent;
  let fixture: ComponentFixture<CatpercepcionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpercepcionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpercepcionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
