import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduccionesFormComponent } from './reducciones-form.component';

describe('ReduccionesFormComponent', () => {
  let component: ReduccionesFormComponent;
  let fixture: ComponentFixture<ReduccionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReduccionesFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduccionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
