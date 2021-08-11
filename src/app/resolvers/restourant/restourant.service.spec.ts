import { TestBed } from '@angular/core/testing';

import { RestourantService } from './restourant.service';

describe('RestourantService', () => {
  let service: RestourantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestourantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
