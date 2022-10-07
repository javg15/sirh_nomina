import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinariosAdminComponent } from './ordinarios-admin.component';

describe('OrdinariosAdminComponent', () => {
  let component: OrdinariosAdminComponent;
  let fixture: ComponentFixture<OrdinariosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinariosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
