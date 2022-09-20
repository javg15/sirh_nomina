import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercepcionesadeudosFormComponent } from './percepcionesadeudos-form.component';

describe('PercepcionesadeudosFormComponent', () => {
  let component: PercepcionesadeudosFormComponent;
  let fixture: ComponentFixture<PercepcionesadeudosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercepcionesadeudosFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercepcionesadeudosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
