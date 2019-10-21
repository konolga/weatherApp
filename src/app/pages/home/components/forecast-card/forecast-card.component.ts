import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SettingsService } from 'src/app/core/services/SettingsService/settings.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})

export class ForecastCardComponent implements OnInit {

  constructor() {
  }
  @Input() weather: any;
  ngOnInit() {
  }

}
