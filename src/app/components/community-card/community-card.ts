import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '../../interfaces/community';

@Component({
  selector: 'app-community-card',
  imports: [RouterLink],
  templateUrl: './community-card.html',
  styleUrl: './community-card.css'
})
export class CommunityCard {

  community = input.required<Community>();

}
