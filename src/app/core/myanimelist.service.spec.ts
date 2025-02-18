import { TestBed } from '@angular/core/testing';

import { MyanimelistService } from './myanimelist.service';

describe('MyanimelistService', () => {
  let service: MyanimelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyanimelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
