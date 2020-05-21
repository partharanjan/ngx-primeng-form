import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPrimengFormComponent } from './ngx-primeng-form.component';

describe('NgxPrimengFormComponent', () => {
  let component: NgxPrimengFormComponent;
  let fixture: ComponentFixture<NgxPrimengFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPrimengFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPrimengFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
