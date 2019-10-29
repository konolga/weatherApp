import { Component, OnInit, Input } from '@angular/core';


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
