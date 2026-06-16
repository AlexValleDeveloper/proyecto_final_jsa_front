import { Component, inject, signal } from '@angular/core';
import { Users } from '../../services/users';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  // Inyección de dependencias.
  private usersService = inject(Users);

  // SIGNALS
  //Controla que pestaña está activa en el dashboard
  pestania = signal('usuarios');
  users = signal<User[]>([]); // Lista de usuarios devuelta.
  error = signal<string | null>(null); // Mensaje de error o null
  // Filtro activo de validación: undefined = todos, 0 = pendientes, 1 = validados
  // Lo persiste para que validateUser recargue con el mismo filtro
  activeFilter = signal<number | undefined>(undefined);

  // Carga los usuarios al inicializar el componente.
  async ngOnInit() {
    await this.loadUsers();
  }

  // Carga la lista de usuarios, con filtro opcional por estado de validación.
  async loadUsers(validated?: number) {
    try {
      // LLamo a la funcion del users service para recuperar los usuarios.
      const response = await this.usersService.getUsers(validated);

      // Le meto al sinal users la info recuperada.
      this.users.set(response.users);
    } catch (error: any) {
      // Le metemos al signal de error un mensaje. Si es null no entrar
      // Si falla, guarda el mensaje de error en el signal
      this.error.set(error.error?.msj || 'Error al cargar los usuarios');
    }
  }

  // Valida al usuario con el id dado y recarga la lista manteniendo el filtro activo.
  async validateUser(id: number) {
    try {
      await this.usersService.validateUser(id);
      await this.loadUsers(this.activeFilter());
    } catch (error: any) {
      this.error.set(error.error?.msj || 'Error al validar el usuario');
    }
  }

  // Guarda el filtro elegido en activeFilter y recarga la lista con ese filtro.
  // Se llama desde los botones del HTML:
  // "Todos" → setFilter() → activeFilter = undefined → devuelve todos
  // "Pendientes" → setFilter(0) → activeFilter = 0 → devuelve no validados
  // "Validados" → setFilter(1) → activeFilter = 1 → devuelve validados
  setFilter(validated?: number) {
    this.activeFilter.set(validated);
    this.loadUsers(validated);
  }
}
