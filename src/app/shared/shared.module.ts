import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
exports: [
  HeaderNavComponent
]

})
export class SharedModule { }
