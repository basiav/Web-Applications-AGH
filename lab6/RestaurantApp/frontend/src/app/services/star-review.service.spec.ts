import { TestBed } from '@angular/core/testing';

import { StarReviewService } from './star-review.service';

describe('StarService', () => {
  let service: StarReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
