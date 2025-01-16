import { Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests: number = 0;
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.stop();
      }
    });
  }

  start() {
    this.activeRequests++;
    console.log('START', this.activeRequests);
    this.loadingSubject.next(true);
  }

  stop() {
    if (this.activeRequests > 0) this.activeRequests--;
    if (this.activeRequests <= 0) {
      setTimeout(() => this.loadingSubject.next(false), 8000);
    }
  }
}
