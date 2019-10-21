import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/components/home/home.component';
import { FavoriteComponent } from './pages/favorite/components/favorite/favorite.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'favorite', component: FavoriteComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
