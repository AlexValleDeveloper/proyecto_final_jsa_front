import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {

  private ordersService = inject(OrdersService);

  orders: any[] = [];

  async ngOnInit() {
    try {
      this.orders = await this.ordersService.getOrders() as any[];
    } catch (error) {
      console.error(error);
    }
  }
}