import { Component, inject, signal } from '@angular/core';
import { Carts } from '../../services/carts';
import { Router, RouterLink } from '@angular/router';
import { ICart } from '../../interfaces/icart';
import { Users } from '../../services/users';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  // Inyección de dependencias.
  private cartsService = inject(Carts);
  private usersService = inject(Users);
  private router = inject(Router);

  // Signals que necestio.
  cart = signal<ICart | null>(null);

  // Carga el carrito al inicializar el componente con un metodo reutilizable que estableceré ahora.
  async ngOnInit() {
    await this.loadCart();
  }

  // Método reutilizable para recargar el carrito
  async loadCart() {
    try {
      // Llamo a la función del service.
      const response = await this.cartsService.getCart();

      // Le meto la respuesta (la info del carrito) al signal.
      this.cart.set(response);
    } catch (error) {
      console.error(error);
    }
  }

  // LLamo a la función del service que cambia la cantidad de productos.
  async updateQuantity(itemId: number, body: { quantity: number }) {
    try {
      await this.cartsService.updateItemQuantity(itemId, body);
      await this.loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  // LLamo a la función del service que borra un item del carrito
  async removeItem(itemId: number) {
    try {
      await this.cartsService.deleteItemFromCart(itemId);
      await this.loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  // LLamo a la funcion del service para vaciar el carrito.
  async clearCart() {
    try {
      await this.cartsService.deleteAllFromCart();
      await this.loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  // Funcion para confirmar el pedido (order).
  // Completar cuand ordersService este listo.
  // Necesitamos post/orders
  async confirmOrder() {
    try {
      // 1. Obtengo el perfil del usuario para comprobar address y phone
      const user = await this.usersService.getProfile();

      // 2. Si no tiene address o phone → redirigir a /profile
      if (!user.address || !user.phone) {
        this.router.navigate(['/profile']);
        return;
      }

      // 3. TODO: llamar a ordersService.createOrder() cuando tengamos el servicio de orders. (PENDIENTE)
    } catch (error) {
      console.error(error);
      // TODO 2: manejar error 409 (stock insuficiente) y mostrar mensaje al usuario (PENDIENTE)
    }
  }
}
