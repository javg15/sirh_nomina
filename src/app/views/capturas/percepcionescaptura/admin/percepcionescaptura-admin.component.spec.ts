import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercepcionescapturaAdminComponent } from './percepcionescaptura-admin.component';

describe('PercepcionescapturaAdminComponent', () => {
  let component: PercepcionescapturaAdminComponent;
  let fixture: ComponentFixture<PercepcionescapturaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercepcionescapturaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercepcionescapturaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
