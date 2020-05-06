import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineFormValidationComponent } from './inline-form-validation.component';

describe('InlineFormValidationComponent', () => {
  let component: InlineFormValidationComponent;
  let fixture: ComponentFixture<InlineFormValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineFormValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
