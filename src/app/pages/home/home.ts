import { Component, signal } from '@angular/core';
import { CommunityCard } from '../../components/community-card/community-card';
import { Community } from '../../interfaces/community';

@Component({
  selector: 'app-home',
  imports: [CommunityCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  communities = signal<Community[]>([
    {
      id: 1,
      name: 'Islas Canarias',
      image: '/canarias.jpg'
    },
    {
      id: 2,
      name: 'Castilla y León',
      image: '/img_login.png'
    },
    {
      id: 3,
      name: 'Cataluña',
      image: '/cataluna.jpg'
    }
  ]);

}