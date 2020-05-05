import { TestBed } from '@angular/core/testing';

import { NgxPrimengFormService } from './ngx-primeng-form.service';

describe('NgxPrimengFormService', () => {
  let service: NgxPrimengFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPrimengFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
