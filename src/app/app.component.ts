import { Component } from '@angular/core';
import { LocationService } from './core/services/locationService/location.service';
import { Observable } from 'rxjs';
import { SettingsService } from './core/services/SettingsService/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherApp';
  theme$: Observable<any>;

  constructor(
    private locationService: LocationService,
    private settingService: SettingsService
    ) {
     this.locationService
      .getDeviceLocation()
      .subscribe();
     this.theme$ = this.settingService.isDarkTheme();
  }
}
