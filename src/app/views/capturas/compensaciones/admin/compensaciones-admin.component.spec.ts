import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesAdminComponent } from './compensaciones-admin.component';

describe('CompensacionesAdminComponent', () => {
  let component: CompensacionesAdminComponent;
  let fixture: ComponentFixture<CompensacionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensacionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
