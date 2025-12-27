import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check authentication status
  if (authService.getAuthStatus()()) {
    // Allow access if authenticated
    return true;
  } else {
    // Redirect to browse profile if not authenticated
    router.navigate(['/browse']);
    return false;
  }
};
