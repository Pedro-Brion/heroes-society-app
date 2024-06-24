import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [HttpClient, SsrCookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  platformId = inject(PLATFORM_ID);
  id: string = '';
  name: string = '';
  access_token: string = '';
  constructor(private http: HttpClient, private cookie: SsrCookieService) {
    this.initialize();
  }

  initialize() {
    this.getUserId();
  }

  async getUserId() {
    this.id = this.cookie.get('userId');
    this.access_token = this.cookie.get('access_token');

    // if (isPlatformBrowser(this.platformId)) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.http
          .get(`http://localhost:3000/auth/me`, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${this.access_token}`,
            }),
          })
          .subscribe((res: any) => {
            console.log(res);
            this.id = res.user.id;
            this.name = res.user.name;
            this.access_token = res.access_token;
            this.cookie.set('userId', this.id, 12000, '/');
            this.cookie.set('access_token', this.access_token, 12000, '/');
          });
      } catch (err) {
        console.error(err);
      }
    }
  }
}
