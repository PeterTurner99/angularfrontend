import { TestBed } from '@angular/core/testing';

import { AuthCheck } from './auth-check';

describe('AuthCheck', () => {
  let service: AuthCheck;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCheck);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
