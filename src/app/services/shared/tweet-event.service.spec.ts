import { TestBed } from '@angular/core/testing';

import { TweetEventService } from './tweet-event.service';

describe('TweetEventService', () => {
  let service: TweetEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
