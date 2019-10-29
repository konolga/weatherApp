import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { LocationService } from 'src/app/core/services/locationService/location.service';
import { SettingsService } from 'src/app/core/services/SettingsService/settings.service';
import { City } from 'src/app/core/models/city';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
@Input() weather$: any;
  city$: Observable<City>;
  isMetric$: Observable<boolean>;

  constructor(
    private locationService: LocationService,
    private settingService: SettingsService
    ) {
      this.isMetric$ = this.settingService.isMetric();
      this.city$ = this.locationService.currentLocation;
    }

  ngOnInit() {

  }

}
