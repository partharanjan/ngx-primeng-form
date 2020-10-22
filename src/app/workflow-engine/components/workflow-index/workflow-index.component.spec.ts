import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowIndexComponent } from './workflow-index.component';

describe('WorkflowIndexComponent', () => {
  let component: WorkflowIndexComponent;
  let fixture: ComponentFixture<WorkflowIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
