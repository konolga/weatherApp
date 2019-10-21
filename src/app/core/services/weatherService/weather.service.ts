import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) {}
  forecastUrl = environment.forecastUrl;
  curCondUrl = environment.curCondUrl;

  getWeather(cityKey): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const options = {
      httpOptions,
      params: new HttpParams()
        .set('apikey', environment.accuweatherApikey)
        .set('units', 'metric')
    };
    return this.http.get<Observable<any>>(`${this.curCondUrl}/${cityKey}`, options)
    .pipe(catchError(err => {
      console.log('Toastr error: ', err.message);
      return of(this.toastr.error(`Cannot get current weather conditions from ${err.url}`), {timeOut: 3000});
    }));
  }

  getForecast(cityKey): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const options = {
      httpOptions,
      params: new HttpParams()
        .set('apikey', environment.accuweatherApikey)
        .set('units', 'metric')
    };
    return this.http.get(`${this.forecastUrl}/${cityKey}`, options)
    .pipe(catchError(err => {
      console.log('Toastr error: ', err.message);
      return of(this.toastr.error(`Cannot get forecast from ${err.url}`), {timeOut: 3000});
    }));
  }

  getWeatherData(cityKey): Observable<any> {
    return cityKey ? combineLatest([
      this.getWeather(cityKey),
      this.getForecast(cityKey)
    ]).pipe(
      map(([weather, forecast]) => {
        return { weather, forecast };
      })
    ) : of([]);
  }
}
