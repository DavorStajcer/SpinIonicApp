import { TestBed } from '@angular/core/testing';

import { OrdersResolverService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
