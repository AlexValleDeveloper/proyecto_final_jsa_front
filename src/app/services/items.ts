import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ItemFilters } from '../interfaces/item-filters';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/items';
  private adminUrl = 'http://localhost:3000/api/admin/items';

  async getItems(filters: ItemFilters = {}) {

    let params = new HttpParams();

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    if (filters.category) {
      params = params.set('category', filters.category);
    }

    if (filters.community) {
      params = params.set('community', filters.community);
    }

    if (filters.minPrice) {
      params = params.set('minPrice', filters.minPrice);
    }

    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    return await firstValueFrom(
      this.http.get(this.baseUrl, { params })
    );
  }

  async getItemById(id: number) {
    return await firstValueFrom(
      this.http.get(`${this.baseUrl}/${id}`)
    );
  }

  async createItem(body: any) {
    return await firstValueFrom(
      this.http.post(this.adminUrl, body)
    );
  }

  async updateItem(id: number, body: any) {
    return await firstValueFrom(
      this.http.patch(`${this.adminUrl}/${id}`, body)
    );
  }

  async deleteItem(id: number) {
    return await firstValueFrom(
      this.http.delete(`${this.adminUrl}/${id}`)
    );
  }

}