import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/core/services/locationService/location.service';
import { map } from 'rxjs/operators';
import { City } from 'src/app/core/models/city';
import { SettingsService } from 'src/app/core/services/SettingsService/settings.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() weather: any;
  city$: any;
  isMetric$: Observable<any>;

  constructor(
    private locationService: LocationService,
    private settingService: SettingsService
    ) {
      this.isMetric$ = this.settingService.isMetric();
    }

  ngOnInit() {
    this.city$ = this.locationService.getCityData();
  }

}
