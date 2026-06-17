import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/items';

  async getItemsByCommunity(
    communityId: number,
    category?: number,
    search?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<Item[]> {

    const params = new URLSearchParams();

    params.set('community', String(communityId));

    if (category) {
      params.set('category', String(category));
    }

    if (search) {
      params.set('search', search);
    }

    if (minPrice) {
      params.set('minPrice', String(minPrice));
    }

    if (maxPrice) {
      params.set('maxPrice', String(maxPrice));
    }

    return await firstValueFrom(
      this.http.get<Item[]>(`${this.baseUrl}?${params.toString()}`)
    );
  }

  async getItemById(id: number): Promise<Item> {
    return await firstValueFrom(
      this.http.get<Item>(`${this.baseUrl}/${id}`)
    );
  }

}