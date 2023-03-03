import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabMenuModule} from 'primeng/tabmenu';
import { NavMenuComponent } from './nav-menu.component';

@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule
  ],
  exports: [
    NavMenuComponent
  ]
})
export class NavMenuModule { }
