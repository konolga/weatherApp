import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

dark = false;
metric = true;
themeDark: BehaviorSubject<any>;
tempUnit: BehaviorSubject<any>;


themes = {
  dark: '../node_modules/bootswatch/dist/Superhero/bootstrap.min.css',
  light: '../node_modules/bootswatch/dist/Spacelab/bootstrap.min.css'
  };
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
