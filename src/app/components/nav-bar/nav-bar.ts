import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  // Inyección de dependencias
  private authService = inject(Auth);
  private router = inject(Router);

  // Signals de estado de sesión
  isLoggedIn = signal(false);
  isAdmin = signal(false);
  mobileMenuOpen = signal(false);

  ngOnInit() {
    this.checkSession();
    this.router.events.subscribe(() => {
      this.mobileMenuOpen.set(false);
      this.checkSession();
    });
  }

  // Comprueba si hay token y si el rol es admin, para mostrar el navbar correspondiente
  checkSession() {
    const token = this.authService.getToken();

    if (!token) {
      this.isLoggedIn.set(false);
      this.isAdmin.set(false);
      return;
    }

    this.isLoggedIn.set(true);

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.isAdmin.set(payload.role === 'admin');
  }

  // Cierra sesión: borra el token y redirige a login
  logout() {
    this.authService.removeToken();
    this.isLoggedIn.set(false);
    this.isAdmin.set(false);
    this.router.navigate(['/login']);
  }
}
