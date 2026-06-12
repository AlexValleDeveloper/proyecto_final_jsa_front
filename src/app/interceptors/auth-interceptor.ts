import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Lee el token desde localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, envía la petición tal cual (rutas públicas)
  if (!token) {
    return next(req);
  }

  /**Clonamos la petición porque las peticiones en Angular son inmutables, no se pueden modificar
   *  directamente. Hay que clonarlas con los cambios.
   */
  const reqWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Envía la petición modificada (clonada)
  return next(reqWithToken);
};
