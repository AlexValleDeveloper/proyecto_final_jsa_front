import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users';

// Validador personalizado a nivel de FormGroup — compara password y confirmPassword
// Va fuera de la clase porque no necesita acceso a 'this' y así es reutilizable.
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Inyecta los servicios necesarios (no necesitas authService aquí)
  private usersService = inject(Users);
  private router = inject(Router);

  // Signals para el toggle de visibilidad de contraseñas
  showPassword = signal(false);
  showConfirm = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  toggleConfirm() {
    this.showConfirm.update((v) => !v);
  }

  // Defino el formulario con sus campos y validaciones
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatch },
  ); // Validador de grupo: comprueba que las contraseñas coinciden

  // Método onSubmit:
  async onSubmit() {
    // 1. Comprobar si el formulario es válido
    if (this.registerForm.invalid) return;

    try {
      // 2. Llamar al servicio — confirmPassword no se envía al back
      await this.usersService.register(
        this.registerForm.value as {
          email: string;
          name: string;
          birthDate: string;
          password: string;
        },
      );
      // 3. Si va bien → redirigir al login (el admin tiene que validarte primero)
      this.router.navigate(['/login']);

      // 4. Si va mal → manejar el error
    } catch (error) {
      console.error(error);
    }
  }
}
