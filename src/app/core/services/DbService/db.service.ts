import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor() {}

  setData(key, value): Observable<any> {
    localStorage.setItem(key, JSON.stringify(value));
    return of(value);
  }

  getData(key): Observable<any> {
    return of(JSON.parse(localStorage.getItem(key)));
  }
  deleteData(key): Observable<any> {
    return of(localStorage.removeItem(key));
  }
}
