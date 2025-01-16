import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './core/models/User';
import { LoadingComponent } from './common/components/loading/loading.component';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, RouterLink, RouterLinkActive],
  providers: [HttpClient, SsrCookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.loadingService.loading$.subscribe((_loading) => {
      this.loading = _loading;
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.getUserLogged();
    }
  }
}
