import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroactivosFormComponent } from './retroactivos-form.component';

describe('RetroactivosFormComponent', () => {
  let component: RetroactivosFormComponent;
  let fixture: ComponentFixture<RetroactivosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetroactivosFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroactivosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
