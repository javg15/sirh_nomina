import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatvariablesbaseAdminComponent } from './catvariablesbase-admin.component';

describe('CatvariablesbaseAdminComponent', () => {
  let component: CatvariablesbaseAdminComponent;
  let fixture: ComponentFixture<CatvariablesbaseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatvariablesbaseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatvariablesbaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
