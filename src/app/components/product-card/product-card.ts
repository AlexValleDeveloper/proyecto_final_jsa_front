import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  item = input.required<Item>();

  expanded = signal(false);

  toggleDescription(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.expanded.update(value => !value);
  }

}