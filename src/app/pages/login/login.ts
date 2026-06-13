import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Inyección de servicios necesarios: userService, authService, Router.
  private usersService = inject(Users);
  private authService = inject(Auth);
  private router = inject(Router);

  // Definición del formulario reactivo con sus campos y validaciones.
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // Signal para controlar si la contraseña es visible o no
  showPassword = signal(false);
  // Alterna entre mostrar y ocultar la contraseña
  togglePassword() {
    // update() recibe el valor actual (v) y devuelve el contrario
    this.showPassword.update((v) => !v);
  }

  // Método que se ejecuta al enviar el formulario
  async onSubmit() {
    // Si el formulario no es válido, no hace nada
    if (this.loginForm.invalid) return;

    try {
      // Llama al servicio para hacer login y recibe el token
      const response = await this.usersService.login(
        this.loginForm.value as { email: string; password: string },
      );
      // Guarda el token en localStorage
      this.authService.saveToken(response.token);
      // Redirige al home
      this.router.navigate(['/']);
    } catch (error) {
      // Si el back devuelve error (401, etc.) lo mostramos en consola por ahora
      console.error(error);
    }
  }
}
