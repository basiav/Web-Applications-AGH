import { TestBed } from '@angular/core/testing';

import { WebRequestsService } from './web-requests.service';

describe('WebRequestsService', () => {
  let service: WebRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
