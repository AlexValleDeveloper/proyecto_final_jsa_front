import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../services/orders';
import { Order } from '../../interfaces/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {

  private ordersService = inject(OrdersService);

  orders = signal<Order[]>([]);

  async ngOnInit() {
    try {
      const data: any[] = await this.ordersService.getOrders();

      const mappedOrders = data.map((order) => ({
        ...order,
        orderDate: order.orderDate || order.order_date,
        shippingDate: order.shippingDate || order.shipping_date
      }));

      this.orders.set(mappedOrders);
      ;
    } catch (error: any) {
      console.error(error);
    }
  }

}