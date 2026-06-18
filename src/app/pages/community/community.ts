import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from '../../services/communities';
import { ItemsService } from '../../services/items';
import { ProductCard } from '../../components/product-card/product-card';
import { Community as CommunityInterface } from '../../interfaces/community';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-community',
  imports: [ProductCard],
  templateUrl: './community.html',
  styleUrl: './community.css',
})
export class Community {
  private activatedRoute = inject(ActivatedRoute);
  private communitiesService = inject(CommunitiesService);
  private itemsService = inject(ItemsService);

  community = signal<CommunityInterface | null>(null);
  communityId = signal<number>(0);

  items = signal<Item[]>([]);

  search = signal<string>('');
  category = signal<number | undefined>(undefined);
  minPrice = signal<number | undefined>(undefined);
  maxPrice = signal<number | undefined>(undefined);

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      this.communityId.set(id);

      const communities = await this.communitiesService.getCommunities();
      const selectedCommunity = communities.find((community) => community.id === id);

      if (selectedCommunity) {
        this.community.set(selectedCommunity);
      }

      await this.loadItems();
    });
  }

  async loadItems() {
    const items = await this.itemsService.getItemsByCommunity(
      this.communityId(),
      this.category(),
      this.search(),
      this.minPrice(),
      this.maxPrice(),
    );

    this.items.set(items);
  }
}
