import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { SearchComponent } from './components/search/search.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    WeatherCardComponent,
    SearchComponent,
    ForecastCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
