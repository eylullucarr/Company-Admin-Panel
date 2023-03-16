import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './location/country/country.component';
import { LocationListComponent } from './location/location-list/location-list.component';

import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'sector',
    pathMatch: 'full',
    component: ProductComponent,
  },
  {
    path: 'location-list',
    pathMatch: 'full',
    component: LocationListComponent,
  },
  {
    path: 'country',
    pathMatch: 'full',
    component: CountryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
