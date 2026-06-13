import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/categories';

  async getCategories() {
    return await firstValueFrom(
      this.http.get(this.baseUrl)
    );
  }
}