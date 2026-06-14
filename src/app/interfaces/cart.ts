// Aquí están las dos interfaces necesarias para tipar todo lo del carrito.

// cart.ts
export interface CartItem {
  itemId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface Cart {
  msj: string;
  cartItems: CartItem[];
  totalPrice: number;
}
