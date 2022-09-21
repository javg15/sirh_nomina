import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduccionesAdminComponent } from './reducciones-admin.component';

describe('ReduccionesAdminComponent', () => {
  let component: ReduccionesAdminComponent;
  let fixture: ComponentFixture<ReduccionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduccionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduccionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
