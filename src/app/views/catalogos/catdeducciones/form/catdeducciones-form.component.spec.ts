import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdeduccionesFormComponent } from './catdeducciones-form.component';

describe('CatdeduccionesFormComponent', () => {
  let component: CatdeduccionesFormComponent;
  let fixture: ComponentFixture<CatdeduccionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatdeduccionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatdeduccionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
