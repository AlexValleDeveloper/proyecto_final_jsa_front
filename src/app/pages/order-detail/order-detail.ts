import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);

  order = signal<Order | null>(null);

  async ngOnInit() {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      const data: any = await this.ordersService.getOrderById(id);

      const mappedOrder = {
        ...data,
        userId: data.userId || data.user_id,
        orderDate: data.orderDate || data.order_date,
        shippingDate: data.shippingDate || data.shipping_date
      };

      this.order.set(mappedOrder);

    } catch (error: any) {
      console.error(error);
    }
  }

}