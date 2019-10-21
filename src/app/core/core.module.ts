import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { WeatherService } from './services/weatherService/weather.service';
import { LocationService } from './services/locationService/location.service';
import { DbService } from './services/DbService/db.service';
import { SettingsService } from './services/SettingsService/settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LocationService,
    WeatherService,
    DbService,
    SettingsService
  ],
})
export class CoreModule { }
