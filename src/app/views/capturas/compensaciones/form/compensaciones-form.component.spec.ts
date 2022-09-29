import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensacionesFormComponent } from './compensaciones-form.component';

describe('CompensacionesFormComponent', () => {
  let component: CompensacionesFormComponent;
  let fixture: ComponentFixture<CompensacionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompensacionesFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
