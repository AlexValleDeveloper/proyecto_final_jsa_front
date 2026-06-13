import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/communities';

  async getCommunities() {
    return await firstValueFrom(
      this.http.get(this.baseUrl)
    );
  }
}