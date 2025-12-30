import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (authService.isAuthenticated()) {
    void router.navigate(['/home']);
    return false;
  }

  return true;

};
