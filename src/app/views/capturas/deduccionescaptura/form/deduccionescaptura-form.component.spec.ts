import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeduccionescapturaFormComponent } from './deduccionescaptura-form.component';

describe('DeduccionescapturaFormComponent', () => {
  let component: DeduccionescapturaFormComponent;
  let fixture: ComponentFixture<DeduccionescapturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeduccionescapturaFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeduccionescapturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
