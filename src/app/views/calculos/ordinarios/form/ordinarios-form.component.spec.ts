import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinariosFormComponent } from './ordinarios-form.component';

describe('OrdinariosFormComponent', () => {
  let component: OrdinariosFormComponent;
  let fixture: ComponentFixture<OrdinariosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdinariosFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
