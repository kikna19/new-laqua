import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderStatus = 0;

  constructor() { }

  showLoader(): void {
    this.loaderStatus = 1;
  }

  hideLoader(): void {
    this.loaderStatus = 0;
  }

  loading = <T>(obs: Observable<T>): Observable<T> => {
    this.showLoader();
    return obs.pipe(
      delay(2000),
      finalize(() => this.hideLoader())
    )
  }

}
