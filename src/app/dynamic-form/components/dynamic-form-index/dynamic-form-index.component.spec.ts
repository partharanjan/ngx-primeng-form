import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormIndexComponent } from './dynamic-form-index.component';

describe('DynamicFormIndexComponent', () => {
  let component: DynamicFormIndexComponent;
  let fixture: ComponentFixture<DynamicFormIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
