import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibosFormComponent } from './recibos-form.component';

describe('RecibosFormComponent', () => {
  let component: RecibosFormComponent;
  let fixture: ComponentFixture<RecibosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecibosFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
