import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/api/recipes';

  async getRecipes(communityId?: number): Promise<Recipe[]> {

    try {

      let params = new HttpParams();

      if (communityId) {
        params = params.set('community', communityId);
      }

      const recipes = await firstValueFrom(
        this.http.get<Recipe[]>(this.baseUrl, { params })
      );

      return recipes;

    } catch (error) {

      console.error(
        '[RecipesService] Error al obtener las recetas:',
        error
      );

      throw error;
    }
  }

  async getRecipeById(id: number): Promise<Recipe> {

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('ID de receta no válido');
    }

    try {

      const recipe = await firstValueFrom(
        this.http.get<Recipe>(`${this.baseUrl}/${id}`)
      );

      return recipe;

    } catch (error) {

      console.error(
        `[RecipesService] Error al obtener la receta ${id}:`,
        error
      );

      throw error;
    }
  }

  async recipeExists(id: number): Promise<boolean> {

    try {

      await this.getRecipeById(id);
      return true;

    } catch {

      return false;
    }
  }

}