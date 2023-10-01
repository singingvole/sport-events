import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingAnimationService {
  private _isLoading$: Subject<boolean> = new Subject();

  get isLoading$(): Subject<boolean> {
    return this._isLoading$;
  }

  startLoadingAnimation() {
    this._isLoading$.next(true);
  }

  stopLoadingAnimation() {
    this._isLoading$.next(false);
  }
}
