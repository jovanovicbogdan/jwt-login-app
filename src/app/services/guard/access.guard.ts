import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const accessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authToken = localStorage.getItem('asat');
  return true;

  if (authToken) {
    return true;
  }

  router.navigateByUrl('/login');

  return false;
};
