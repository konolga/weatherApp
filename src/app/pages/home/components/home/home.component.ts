import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/core/services/locationService/location.service';
import { map } from 'rxjs/operators';
import { DbService } from 'src/app/core/services/DbService/db.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weather$: Observable<any>;
  currentLocation: Observable<any>;
  cityKey: Observable<any>;

  constructor(
    private locationService: LocationService,
    private dbService: DbService) {
  }

  ngOnInit() {
    this.weather$ = this.locationService.getWeatherData().pipe(
      map(data => {
        return data;
      })
    );
  }

  onKeyChange(cityKey) {
    this.cityKey = cityKey;
  }
  onAddToFavorites() {
    const currentLocation = JSON.parse(localStorage.getItem('currentLocation'));
    return this.locationService.toggleFavorite(currentLocation);
  }

  isFavorite() {
    const currentLocation = JSON.parse(localStorage.getItem('currentLocation'));
    const fav = JSON.parse(localStorage.getItem('favorites'));
    return fav && fav[currentLocation.Key];

  }
}
