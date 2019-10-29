import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { FavoriteModule } from './favorite/favorite.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    FavoriteModule
  ]
})
export class PagesModule { }

