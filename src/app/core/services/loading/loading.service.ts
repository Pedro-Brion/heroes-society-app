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

  private timer: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.start('NAVIGATION');
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.stop();
      }
    });
  }

  start(parent?: string) {
    this.activeRequests++;
    console.log('START', this.activeRequests, parent);
    this.loadingSubject.next(true);
    clearTimeout(this.timer);
  }

  stop() {
    console.log('STOPING', --this.activeRequests);
    if (this.activeRequests <= 0)
      this.timer = setTimeout(() => {
        console.log('STOPING FOR REAL');
        this.loadingSubject.next(false);
      }, 200);
  }
}
