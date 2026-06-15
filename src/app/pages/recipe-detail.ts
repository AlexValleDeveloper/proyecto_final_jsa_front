import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private recipesService = inject(RecipesService);

  recipe: Recipe | null = null;
  loading = true;
  error = '';

  async ngOnInit() {
    try {

      const id = Number(
        this.route.snapshot.paramMap.get('id')
      );

      if (!id) {
        this.error = 'ID de receta no válido';
        return;
      }

      this.recipe = await this.recipesService.getRecipeById(id) as Recipe;

    } catch (err) {

      console.error(err);
      this.error = 'No se pudo cargar la receta';

    } finally {

      this.loading = false;

    }
  }
}