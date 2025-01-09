import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private api: ApiService) {}

  loadAll() {
    return this.api.get(`heroes`);
  }
}
