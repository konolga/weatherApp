import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/core/services/locationService/location.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { City } from 'src/app/core/models/city';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() cityKey = new EventEmitter<string>();
  public cities: City [];
  public city: City;
  public text$: string;
  constructor( private locationService: LocationService) { }

  ngOnInit() {
    this.cities = [];
    this.getCities();

  }

  formatter = (city: City) => city.LocalizedName + ', ' + city.Country.LocalizedName || '';

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2
      ? []
      : this.cities.filter(v => v.LocalizedName.toLowerCase().startsWith(term.toLocaleLowerCase()))
                   .splice(0, 5)))

  citySelected(city) {
   return this.locationService.setCurrentCity(city.item);
  }

  getCities(): void {
    this.locationService.searchAutocomplete(this.text$)
        .subscribe((cities: City []) => {
        this.cities = cities;
      });
    }
  }
