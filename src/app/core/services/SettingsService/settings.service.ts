import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

dark = false;
metric = true;
themeDark: BehaviorSubject<any>;
tempUnit: BehaviorSubject<any>;

  constructor(
  ) {
    this.themeDark = new BehaviorSubject<any>(this.dark);
    this.tempUnit = new BehaviorSubject<any>(this.metric);
  }

  switchTheme() {
    this.dark = !this.dark;
    this.themeDark.next(this.dark);

  }

  switchUnit() {
    this.metric = !this.metric;
    this.tempUnit.next(this.metric);
  }

  isDarkTheme() {
    return from(this.themeDark);
  }

  isMetric() {
    return from(this.tempUnit);
  }
}
