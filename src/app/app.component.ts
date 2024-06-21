import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient, private cookie: SsrCookieService) {
    this.initialize();
  }

  initialize() {
    this.getUserId();
  }

  async getUserId() {
    this.id = this.cookie.get('userId');

    // if (isPlatformBrowser(this.platformId)) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.id
          ? this.http
              .get(`http://localhost:3000/users/${this.id}`)
              .subscribe((res: any) => {
                this.id = res.id;
                this.name = res.name;
                this.cookie.set('userId', this.id, 12000, '/');
              })
          : this.http
              .get('http://localhost:3000/users/new')
              .subscribe((res: any) => {
                this.id = res.id;
                this.name = res.name;
                this.cookie.set('userId', this.id, 12000, '/');
              });
      } catch (err) {
        console.error(err);
      }
    }
  }
}
