import { Component, inject, signal } from '@angular/core';
import { Users } from '../../services/users';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  // Inyección de dependencias
  private usersService = inject(Users);
  private authService = inject(Auth);
  private router = inject(Router);

  // SIGNALS
  user = signal<User | null>(null);
  successMessage = signal<string | null>(null);
  error = signal<string | null>(null);
  tab = signal<'ver' | 'editar' | 'baja'>('ver'); // Controla qué pestaña está activa: 'ver', 'editar' o 'baja'
  showDeactivateCheck = signal(false); // Para la doble confirmación

  // Formulario reactivo para modificar el perfil de usuario.
  updateProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    phone: new FormControl(''),
  });

  async ngOnInit() {
    // Cargamos el perfil de usuario
    await this.loadProfile();
  }

  async loadProfile() {
    try {
      const response = await this.usersService.getProfile(); // Recogemos la respuesta del back
      const user = response.user; // Metemos la parte de usuario en una constante.
      this.user.set(user); // Actualizamos el valor del signal
      this.updateProfileForm.patchValue({
        name: user.name,
        email: user.email,
        birthDate: user.birthDate ? new Date(user.birthDate).toLocaleDateString('en-CA') : '',
        address: user.address,
        phone: user.phone,
      }); // Rellenamos el formulario con la info del usuario entrante.
    } catch (error: any) {
      this.error.set(error.error?.msj || 'Error al cargar el perfil');
    }
  }

  // === Proceso de actualización del perfil de usurario ===
  async onSubmitUpdate() {
    await this.updateProfile(
      this.updateProfileForm.value as {
        name?: string;
        email?: string;
        birthDate?: string;
        address?: string;
        phone?: string;
      },
    );
  }

  async updateProfile(body: {
    name?: string;
    email?: string;
    birthDate?: string;
    address?: string;
    phone?: string;
  }) {
    try {
      const response = await this.usersService.updateProfile(body);
      this.successMessage.set(response.msj);
      await this.loadProfile();
      setTimeout(() => {
        this.tab.set('ver');
        this.successMessage.set(null);
      }, 2000);
    } catch (error: any) {
      this.error.set(error.error?.msj || 'No se pudo actualizar el perfil');
    }
  }

  // === Proceso de desactivación del perfil de usuario (baja lógica) ===
  // Funciones para manejar el signal de doble confirmación. Dos fuera, una dentro.
  // Abre la doble confirmación.
  openDeactivateCheck() {
    this.showDeactivateCheck.set(true);
  }

  // Cancela y cierra la confirmación
  cancelDeactivateCheck() {
    this.showDeactivateCheck.set(false);
  }

  // Función para desactivar el perfil, llamando al servicio Users.
  async deactivateProfile() {
    try {
      const response = await this.usersService.deactivateProfile();
      this.showDeactivateCheck.set(false); // Cuando acepta el mensaje desaparece.
      this.successMessage.set(response.msj); // mensaje de éxito
      this.authService.removeToken(); // Le retiramos el token
      // Pequeña espera antes de redirigir para que el usuario vea el mensaje
      setTimeout(() => this.router.navigate(['/login']), 3000);
    } catch (error: any) {
      this.showDeactivateCheck.set(false);
      this.error.set(error.error?.msj || 'Error al darte de baja');
    }
  }
}
