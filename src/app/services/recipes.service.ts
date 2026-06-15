import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/recipes';

  async getRecipes(communityId?: number) {

    let url = this.baseUrl;

    if (communityId) {
      url += `?community=${communityId}`;
    }

    return await firstValueFrom(
      this.http.get(url)
    );
  }

  async getRecipeById(id: number) {
    return await firstValueFrom(
      this.http.get(`${this.baseUrl}/${id}`)
    );
  }

}