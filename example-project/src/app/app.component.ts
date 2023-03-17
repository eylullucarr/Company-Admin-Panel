import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `<p-menubar [model]="items"></p-menubar>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  items: MenuItem[] = [];
  title = 'example-project';

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.fillMenu();
  }

  fillMenu() {
    this.items = [
      {
        label: 'Sector',
        icon: 'pi pi-fw pi-building',
        routerLink: '/sector',
      },
      {
        label: 'Location',
        icon: 'pi pi-fw pi-map',
        items: [
          {
            label: 'Location List',
            routerLink: '/location-list',
          },
          {
            label: 'Add Location',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Country',
                routerLink: '/country',
              },
              {
                label: 'City',
                routerLink: '/city',
              },
              {
                label: 'District',
                routerLink: '/district',
              },
              {
                label: 'Village',
              },
            ],
          },
        ],
      },
    ];
  }
}
