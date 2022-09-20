import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercepcionescapturaFormComponent } from './percepcionescaptura-form.component';

describe('PercepcionescapturaFormComponent', () => {
  let component: PercepcionescapturaFormComponent;
  let fixture: ComponentFixture<PercepcionescapturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercepcionescapturaFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercepcionescapturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
