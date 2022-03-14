import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {
  private _isLoading$ = new Subject<boolean>()
  private _status = false
  public isLoading$ = this._isLoading$.asObservable()

  constructor() {
    this._isLoading$.subscribe(status => {
      this._status = status
    })

  }

  get status() {
    return this._status
  }

  start() {
    this._isLoading$.next(true)
  }

  end() {
    this._isLoading$.next(false)
  }
}
