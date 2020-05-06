import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlLayoutComponent } from './form-control-layout.component';

describe('FormControlLayoutComponent', () => {
  let component: FormControlLayoutComponent;
  let fixture: ComponentFixture<FormControlLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
