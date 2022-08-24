import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatvariablesbaseFormComponent } from './catvariablesbase-form.component';

describe('CatvariablesbaseFormComponent', () => {
  let component: CatvariablesbaseFormComponent;
  let fixture: ComponentFixture<CatvariablesbaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatvariablesbaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatvariablesbaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
