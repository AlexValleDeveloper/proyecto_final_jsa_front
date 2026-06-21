import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../interfaces/recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipesService = inject(RecipesService);

  recipe: Recipe | null = null;

  loading = false;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    this.loadRecipe();
  }

  private async loadRecipe(): Promise<void> {
    const id = this.getIdFromRoute();

    if (!id) {
      this.error = 'ID de receta no válido';
      this.router.navigate(['/']);
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const recipe = await this.recipesService.getRecipeById(id);

      if (!recipe) {
        this.error = 'Receta no encontrada';
        this.recipe = null;
        return;
      }

      this.recipe = recipe;

    } catch {
      this.error = 'No se pudo cargar la receta';
      this.recipe = null;
    } finally {
      this.loading = false;
    }
  }

  private getIdFromRoute(): number | null {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = Number(rawId);

    if (!rawId || Number.isNaN(id) || id <= 0) {
      return null;
    }

    return id;
  }
}