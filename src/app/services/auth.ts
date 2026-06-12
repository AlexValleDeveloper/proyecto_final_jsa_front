import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Este servicio va a tener tres método:
  // 1. Guarda el token en el localStorage al hacer el login.
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 2. Lee el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 3. Borra el token de localStorage al hacer logout
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
