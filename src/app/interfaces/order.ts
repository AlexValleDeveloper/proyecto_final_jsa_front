export type OrderStatus = 'pending' | 'processing' | 'shipped';

export interface OrderItem {
    itemId: number;
    name: string;
    image?: string;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    id: number;
    userId?: number;
    status: OrderStatus;
    total: number;
    orderDate: string;
    shippingDate?: string | null;
    items?: OrderItem[];
}