import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpercepcionesAdminComponent } from './catpercepciones-admin.component';

describe('CatpercepcionesAdminComponent', () => {
  let component: CatpercepcionesAdminComponent;
  let fixture: ComponentFixture<CatpercepcionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpercepcionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpercepcionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
