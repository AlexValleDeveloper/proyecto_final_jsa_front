import { Component, inject, signal } from '@angular/core';
import { ItemsService } from '../../services/items';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-items',
  imports: [],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class Items {

  private itemsService = inject(ItemsService);

  items = signal<Item[]>([]);

  async ngOnInit() {
    const response = await this.itemsService.getItems();
    this.items.set(response as Item[]);
  }

}