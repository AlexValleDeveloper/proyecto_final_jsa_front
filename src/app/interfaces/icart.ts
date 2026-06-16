// Aquí están las dos interfaces necesarias para tipar todo lo del carrito.

// cart.ts
export interface ICartItem {
  itemId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export interface ICart {
  msj: string;
  cartItems: ICartItem[];
  totalPrice: number;
}
