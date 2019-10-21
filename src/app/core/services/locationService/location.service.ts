import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { WeatherService } from '../weatherService/weather.service';
import { DbService } from '../DbService/db.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { City } from '../../models/city';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLocation: BehaviorSubject<any>;
  geopositionUrl = environment.geopositionUrl;
  authocompleteUrl = environment.authocompleteUrl;

  constructor(
    private toastr: ToastrService,
    private weatherService: WeatherService,
    private http: HttpClient,
    private dbService: DbService) {
      this.currentLocation = new BehaviorSubject(JSON.parse(localStorage.getItem('currentLocation')));
    }

  getDeviceCoordinates(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        }
      );
    });
  }
// switchMap: data from one observable to use in another

  getDeviceLocation() {
    return from(this.getDeviceCoordinates())
    .pipe(
      switchMap(coordinates => {
        return coordinates && this.searchLocation(coordinates).pipe(map(data => {
          localStorage.setItem('deviceLocation', JSON.stringify(data));
          const currentLocation = localStorage.getItem('currentLocation');
          if (!currentLocation && data) {
            localStorage.setItem('currentLocation', JSON.stringify(data));
            this.currentLocation.next(data);
          }
          return data;
        }));
      })
    );
  }


  searchLocation(coordinates) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const options = {
      httpOptions,
      params: new HttpParams()
      .set('apikey', environment.accuweatherApikey)
      .set('q', `${coordinates.lat},${coordinates.lon}`)
    };
    return this.http.get<Observable<any>>(`${this.geopositionUrl}`, options).pipe(
      map(location => {
          return location;
      }), catchError((err, caught) => {
        console.log('Toastr error: ', err.message);
        return of(this.toastr.error(`Cannot get your location from ${err.url}`), {timeOut: 3000});
      })
    );
  }

  searchAutocomplete(freeText: string): Observable<City[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const options = {
      httpOptions,
      params: new HttpParams()
      .set('apikey', environment.accuweatherApikey)
      .set('q', `${freeText}`)
    };
    return this.http.get<City[]>(`${this.authocompleteUrl}`, options).pipe(
        map(res => (res as City[]).map(c => {
          return {
            Key: c.Key,
            LocalizedName: c.LocalizedName,
            Country: {
              LocalizedName: c.Country.LocalizedName
          }
        };
      })
      , catchError(err => {
        console.log('Toastr error: ', err.message);
        return of(this.toastr.error(`Cannot complete search from ${err.url}`), {timeOut: 3000});
      })
      ));
  }


  getWeatherData(): Observable<any> {
      return this.currentLocation.pipe(switchMap(location => {
          return location
                 ? this.weatherService.getWeatherData(location.Key)
                 : of({});
      }));
  }


  saveLocation(location) {
    return this.dbService.getData('currentLocation').pipe(
      map(data => {
        return this.dbService.setData('currentLocation', data.push(location));
      })
    );
  }

  deleteLocation(location) {
    return this.dbService.getData('currentLocation').pipe(
      map(data => {
        const locations = data.split(data.indexOf(location), 1);
        return this.dbService.setData('currentLocation', locations);
      })
    );
  }

  getLocations() {
    return this.dbService.getData('currentLocation');
  }

  setLocation(location) {
    this.currentLocation.next(location);
    return of(true);
  }

  getCityData() {
    return this.currentLocation;
  }

  getFavorites(): Observable<any[]> {
    const fav = JSON.parse(localStorage.getItem('favorites'));

    return fav && of(Object.keys(fav).map(i => fav[i]));
  }

  toggleFavorite(item) {

    const fav = JSON.parse(localStorage.getItem('favorites')) || {};
    if (fav[item.Key]) {
      delete fav[item.Key];
    } else {
      fav[item.Key] = item;
    }
    localStorage.setItem('favorites', JSON.stringify(fav));
  }

  setCurrentCity(location) {
    this.currentLocation.next(location);
    localStorage.setItem('currentLocation', JSON.stringify(location));
  }


}
