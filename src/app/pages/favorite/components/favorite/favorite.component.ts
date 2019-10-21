import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/core/services/DbService/db.service';

import { LocationService } from 'src/app/core/services/locationService/location.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoritesList$: Observable<any>;

  constructor(
    private locationService: LocationService) {
    }

  ngOnInit() {
    this.favoritesList$ = this.locationService.getFavorites();
  }

  citySelected(city) {
    return this.locationService.setCurrentCity(city);
  }

}
