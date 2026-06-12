import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  // Inyecto el servicio de gestión del token.
  const authService = inject(Auth);
  // Inyecto el Router para redirigir al usuario en caso de ser necesario.
  const router = inject(Router);

  // Guardo la info del token en una constante.
  const token = authService.getToken();

  // Si no hay token redirigir a Login
  if (!token) {
    return router.createUrlTree(['/login']);
  }

  // Si hay token tengo que decodificar el payload.
  const payload = JSON.parse(atob(token.split('.')[1]));
  // Si el payload.role no es "admin" -> redirigir a "/"
  if (payload.role !== 'admin') {
    return router.createUrlTree(['/']);
  }
  // si es "admin"...
  return true;
};
