import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Community } from '../interfaces/community';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/communities';

  async getCommunities(): Promise<Community[]> {
    return await firstValueFrom(
      this.http.get<Community[]>(this.baseUrl)
    );
  }
}