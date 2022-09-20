import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercepcionesadeudosAdminComponent } from './percepcionesadeudos-admin.component';

describe('PercepcionesadeudosAdminComponent', () => {
  let component: PercepcionesadeudosAdminComponent;
  let fixture: ComponentFixture<PercepcionesadeudosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercepcionesadeudosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercepcionesadeudosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
