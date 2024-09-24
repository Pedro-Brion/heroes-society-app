import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests: number = 0;
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  start() {
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  stop() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.loadingSubject.next(false);
    }
  }
}
