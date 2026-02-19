import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsService {
  private readonly showCategoryFilterSubject = new BehaviorSubject<boolean>(true);

  get showCategoryFilter$(): Observable<boolean> {
    return this.showCategoryFilterSubject.asObservable();
  }

  setShowCategoryFilter(value: boolean): void {
    this.showCategoryFilterSubject.next(value);
  }
}

