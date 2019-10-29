import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/SettingsService/settings.service';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(
    private settingService: SettingsService
  ) { }

  ngOnInit() {
  }

  switchTheme() {
    return this.settingService.switchTheme();
  }

 switchTemp() {
    return this.settingService.switchUnit();
  }

}

