import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';

import { MainPageComponent } from './main-page/main-page.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'main-page',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: 'sector',
    pathMatch: 'full',
    component: ProductComponent,
  },
  {
    path: 'location',
    pathMatch: 'full',
    component: LocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
