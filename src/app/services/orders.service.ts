import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/orders';

  async getOrders() {
    return await firstValueFrom(
      this.http.get(this.baseUrl)
    );
  }

  async getOrderById(id: number) {
    return await firstValueFrom(
      this.http.get(`${this.baseUrl}/${id}`)
    );
  }
}