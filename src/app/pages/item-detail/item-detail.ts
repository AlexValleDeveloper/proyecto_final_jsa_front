import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items';
import { Carts } from '../../services/carts';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-item-detail',
  imports: [],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {

  private activatedRoute = inject(ActivatedRoute);
  private itemsService = inject(ItemsService);
  private cartsService = inject(Carts);

  item = signal<Item | null>(null);
  message = signal<string>('');

  async ngOnInit() {
    const id = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    const item = await this.itemsService.getItemById(id);

    this.item.set(item);
  }

  async addToCart() {
    console.log('BOTON PULSADO');
    const selectedItem = this.item();

    if (!selectedItem) {
      return;
    }

    await this.cartsService.addItemToCart({
      itemId: selectedItem.id,
      quantity: 1
    });

    this.message.set('Producto añadido al carrito');
  }

}