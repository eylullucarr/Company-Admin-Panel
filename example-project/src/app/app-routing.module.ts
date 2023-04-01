import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './location/city/city.component';
import { CountryComponent } from './location/country/country.component';
import { DistrictComponent } from './location/district/district.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { VillageComponent } from './location/village/village.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './user-operation/login/login.component';
import { RegisterComponent } from './user-operation/register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'sector',
    pathMatch: 'full',
    loadComponent: () =>
      import('./product/product.component').then((m) => m.ProductComponent),
  },
  {
    path: 'location-list',
    pathMatch: 'full',
    component: LocationListComponent,
  },
  {
    path: 'user',
    pathMatch: 'full',
    component: UserComponent,
  },
  {
    path: 'country',
    pathMatch: 'full',
    component: CountryComponent,
  },
  {
    path: 'city',
    pathMatch: 'full',
    component: CityComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'district',
    pathMatch: 'full',
    component: DistrictComponent,
  },
  {
    path: 'village',
    pathMatch: 'full',
    component: VillageComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  {
    path: 'main-page',
    pathMatch: 'full',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
