import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse } from '../api/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private access_token: string = '';
  private requestSubject = new BehaviorSubject<ApiResponse>({
    data: null,
    error: null,
  });
  public request$: Observable<ApiResponse> = this.requestSubject.asObservable();

  constructor(private cookie: SsrCookieService, private api: ApiService) {}

  getUserLogged() {
    this.api.get(`auth/me`).subscribe({
      next: (res: any) => {
        if (res.user) {
          this.requestSubject.next({
            data: res.user,
            error: null,
          });
        }
      },
      error: (err) => {
        console.error('ERR', err);
        this.getUserLogged();
      },
    });
  }

  public authorizationHeaders(headers?: HttpHeaders) {
    this.access_token = this.cookie.get('access_token');
    let newHeaders = headers || new HttpHeaders();
    newHeaders = newHeaders.append(
      'Authorization',
      `Bearer ${this.access_token}`
    );
    return newHeaders;
  }
}
