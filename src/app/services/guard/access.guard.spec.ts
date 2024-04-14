import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessGuard } from './access.guard';

describe('accessGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => accessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
