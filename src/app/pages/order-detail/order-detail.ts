import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);

  order: any = null;

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.order = await this.ordersService.getOrderById(id);
    } catch (error) {
      console.error(error);
    }
  }
}