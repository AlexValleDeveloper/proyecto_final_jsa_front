import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyecto el servicio de gestión del token.
  const authService = inject(Auth);
  // inyecto Router porque lo voy a necesitar para redirigir.
  const router = inject(Router);

  // Si hay token, el usuario está logueado -> dejar pasar (return true)
  if (authService.getToken()) {
    return true;
  }
  // Si no hay token -> redirigir a login
  /**router.createUrlTree(['/nombre-ruta']) es la forma que tienen los guards de redirigir. No es router.navigate() — eso es para componentes. Los guards devuelven una UrlTree que Angular interpreta como "lleva al usuario aquí". */
  return router.createUrlTree(['/login']);
};
