import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment as env } from '~/environments/environment';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private loading: LoadingService) {}

  get<T>(endpoint: string) {
    this.loading.start(endpoint);
    return this.http
      .get<T>(`${env.apiUrl}/${endpoint}`)
      .pipe(finalize(() => this.loading.stop()));
  }
}
