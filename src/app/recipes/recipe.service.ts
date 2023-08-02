import { EventEmitter, Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new Subject<Recipe>();

  constructor(private slService: ShoppingListService) {}

  recipes: Recipe[] = [
    new Recipe(
      'recipe',
      'IceCreams',
      'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/e/c/p547-149639913259313d1cb99a2.jpg?tr=tr:n-xlarge',
      [new Ingredient('venilla', 20), new Ingredient('chocolate', 20)]
    ),
    new Recipe(
      'New recipe',
      'Chinese',
      'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/d/m/p547-149639908659313ceeaa391.jpg?tr=tr:n-xlarge',
      [new Ingredient('Burger', 1), new Ingredient('Pizza', 2)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppinglist(ingredients: Ingredient[]) {
    this.slService.addIngerdients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
