import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { LocationCardComponent } from './location-card/location-card.component';


@NgModule({
  declarations: [FavoriteComponent, LocationCardComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule
  ]
})
export class FavoriteModule { }
