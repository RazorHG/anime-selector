import { TestBed } from '@angular/core/testing';

import { MyAnimeListService } from './myanimelist.service';

describe('MyanimelistService', () => {
  let service: MyAnimeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAnimeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
