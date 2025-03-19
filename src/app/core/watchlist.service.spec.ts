import { TestBed } from '@angular/core/testing';

import { WatchlistService } from '../core/watchlist.service';

describe('WatchlistService', () => {
  let service: WatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
