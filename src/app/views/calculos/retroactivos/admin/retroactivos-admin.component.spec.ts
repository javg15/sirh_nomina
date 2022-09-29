import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroactivosAdminComponent } from './retroactivos-admin.component';

describe('RetroactivosAdminComponent', () => {
  let component: RetroactivosAdminComponent;
  let fixture: ComponentFixture<RetroactivosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroactivosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroactivosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
