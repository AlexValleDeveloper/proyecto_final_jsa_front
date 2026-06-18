import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { OrdersService } from '../../services/orders';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {

  private ordersService = inject(OrdersService);

  orders = signal<Order[]>([]);

  async ngOnInit() {
    try {
      const data = await this.ordersService.getOrders();
      this.orders.set(data);
    } catch (error) {
      console.error(error);
    }
  }

}