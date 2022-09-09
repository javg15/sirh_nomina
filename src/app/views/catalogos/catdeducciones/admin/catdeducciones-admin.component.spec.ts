import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdeduccionesAdminComponent } from './catdeducciones-admin.component';

describe('CatdeduccionesAdminComponent', () => {
  let component: CatdeduccionesAdminComponent;
  let fixture: ComponentFixture<CatdeduccionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatdeduccionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatdeduccionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
