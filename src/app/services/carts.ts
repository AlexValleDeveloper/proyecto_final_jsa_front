import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class Carts {
  private httpClient = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5000/api/cart';

  // ==== PETICIONES ====
  // Petición para recoger el carrito con lo que tenga dentro.
  getCart() {
    return firstValueFrom(this.httpClient.get<Cart>(this.apiUrl));
  }

  // Petición para añadir un producto al carrito. Según está configurado el backend si ya esta en el carrito se suma la cantidad, sino esta simplemente lo añade.
  addItemToCart(body: { itemId: number; quantity: number }) {
    return firstValueFrom(this.httpClient.post(`${this.apiUrl}/items`, body));
  }

  // Petición para actualizar la cantidad de un producto del carrito.
  updateItemQuantity(itemId: number, body: { quantity: number }) {
    return firstValueFrom(this.httpClient.patch(`${this.apiUrl}/items/${itemId}`, body));
  }

  // Petición para borrar un producto del carrito
  deleteItemFromCart(itemId: number) {
    return firstValueFrom(this.httpClient.delete(`${this.apiUrl}/items/${itemId}`));
  }

  // Peticion para borrar todo el carrito
  deleteAllFromCart() {
    return firstValueFrom(this.httpClient.delete(this.apiUrl));
  }
}
