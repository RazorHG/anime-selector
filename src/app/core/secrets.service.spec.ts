import { TestBed } from '@angular/core/testing';

import { Secrets, SECRETS } from './secrets.service';

describe('SecretsService', () => {
  let service: Secrets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SECRETS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
