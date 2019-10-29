import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/core/services/locationService/location.service';
import { SettingsService } from 'src/app/core/services/SettingsService/settings.service';
import { City } from 'src/app/core/models/city';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() weather: any;
  city$:Observable<City>;
  isMetric$: Observable<boolean>;
  temp: string;
  unit: string;

  constructor(
    private locationService: LocationService,
    private settingService: SettingsService
    ) {
      this.isMetric$ = this.settingService.isMetric();
      this.isMetric$ 
      ? (this.temp= this.weather.weather[0].Temperature.Metric.Value, this.unit= this.weather.weather[0].Temperature.Metric.Unit)
      : (this.temp= (this.weather.weather[0].Temperature.Metric.Value*9/5+32).toFixed(2), this.unit= this.weather.weather[0].Temperature.Imperial.Unit)
    }

  ngOnInit() {
    this.city$ = this.locationService.getCityData();
  }

}
