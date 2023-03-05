import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tabItems: MenuItem[] = [];
  title = 'example-project';

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.fillMenu();
  }

  /* REMARK
       
       Using "command:()=>" when routing with a PrimeNG-TabMenu will not have any effect of changing the active tab (e.g. when reloading the page or entering the URL manually, no tab will be selected).

       Using "routerLink:" works as expected.

       Try to uncomment the corresponding section below and check the result
  */

  fillMenu() {
    this.tabItems = [
      {
        label: 'Home',
        //command: () => this.router.navigate(['home']),
        routerLink: 'main-page',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Sector',
        //command: () => this.router.navigate(['home']),
        routerLink: 'sector',
        icon: 'pi pi-fw pi-building',
      },
      {
        label: 'Location',
        //command: () => this.router.navigate(['home']),
        routerLink: 'location',
        icon: 'pi pi-fw pi-map',
      },
    ];
  }
}
