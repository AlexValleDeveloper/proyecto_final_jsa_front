import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Order, OrderStatus } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/orders';
  private adminUrl = 'http://localhost:3000/api/admin/orders';

  async createOrder() {
    return await firstValueFrom(
      this.http.post(this.baseUrl, {})
    );
  }

  async getOrders(): Promise<Order[]> {
    return await firstValueFrom(
      this.http.get<Order[]>(this.baseUrl)
    );
  }

  async getOrderById(id: number): Promise<Order> {
    return await firstValueFrom(
      this.http.get<Order>(`${this.baseUrl}/${id}`)
    );
  }

  async getAdminOrders(filters: { status?: OrderStatus; user?: number } = {}): Promise<Order[]> {
    let params = new HttpParams();

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.user) {
      params = params.set('user', filters.user);
    }

    return await firstValueFrom(
      this.http.get<Order[]>(this.adminUrl, { params })
    );
  }

  async getAdminOrderById(id: number): Promise<Order> {
    return await firstValueFrom(
      this.http.get<Order>(`${this.adminUrl}/${id}`)
    );
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<any> {
    return await firstValueFrom(
      this.http.patch(`${this.adminUrl}/${id}`, { status })
    );
  }
}