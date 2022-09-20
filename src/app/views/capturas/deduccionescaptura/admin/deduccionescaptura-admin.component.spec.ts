import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeduccionescapturaAdminComponent } from './deduccionescaptura-admin.component';

describe('DeduccionescapturaAdminComponent', () => {
  let component: DeduccionescapturaAdminComponent;
  let fixture: ComponentFixture<DeduccionescapturaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeduccionescapturaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeduccionescapturaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
