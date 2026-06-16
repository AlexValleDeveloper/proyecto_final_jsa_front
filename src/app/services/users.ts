import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api';

  // ==== PETICIONES PÚBLICAS ====
  // Petición para registro de nuevo usuario.
  register(body: { email: string; name: string; birthDate: string; password: string }) {
    return firstValueFrom(this.httpClient.post<User>(`${this.apiUrl}/users/register`, body));
  }

  // Petición del usuario para loguearse.
  login(body: { email: string; password: string }) {
    return firstValueFrom(
      this.httpClient.post<{ token: string }>(`${this.apiUrl}/users/login`, body),
    );
  }

  // ==== PETICIONES PRIVADAS ====
  // USER:
  // Petición del usuario para ver su perfil.
  getProfile() {
    return firstValueFrom(
      this.httpClient.get<{ msj: string; user: User }>(`${this.apiUrl}/users/me`),
    );
  }

  //Petición del usuario para modificar su perfil.
  updateProfile(body: {
    name?: string;
    email?: string;
    birthDate?: string;
    address?: string;
    phone?: string;
  }) {
    return firstValueFrom(this.httpClient.patch<User>(`${this.apiUrl}/users/me`, body));
  }

  // Petición del usuario para darse de baja.
  deactivateProfile() {
    return firstValueFrom(this.httpClient.patch(`${this.apiUrl}/users/me/deactivate`, {}));
  }

  // ADMIN:
  // Petición del admin para recuperar los usuarios.
  getUsers(validated?: number) {
    const url =
      validated !== undefined
        ? `${this.apiUrl}/admin/users?validated=${validated}`
        : `${this.apiUrl}/admin/users`;
    return firstValueFrom(this.httpClient.get<User[]>(url));
  }

  // Petición del admin para validar a un usuario.
  validateUser(id: number) {
    return firstValueFrom(this.httpClient.patch(`${this.apiUrl}/admin/users/validate/${id}`, {}));
  }
}
