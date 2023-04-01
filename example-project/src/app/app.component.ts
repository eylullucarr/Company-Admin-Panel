import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OnChanges, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `<p-menubar [model]="items"></p-menubar>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnChanges, OnInit {
  items: MenuItem[] = [];
  title = 'example-project';

  constructor(private router: Router) {}

  ngOnInit() {
    this.fillMenu(this.IsLoged());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.IsLoged() == true) {
      this.router.navigate(['main-page']);
      this.ngOnInit();
    } else {
      this.router.navigate(['login']);
      this.ngOnInit();
    }
  }

  IsLoged() {
    let visiblty;
    if (localStorage.getItem('token')) {
      console.log('a');
      this.router.navigate(['main-page']);
      visiblty = true;
    } else {
      this.router.navigate(['login']);
      visiblty = false;
    }
    return visiblty;
  }

  fillMenu(visiblty: any) {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: '/login',
        visible: !visiblty,
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
        routerLink: '/register',
        visible: !visiblty,
      },
      {
        label: 'Sector',
        icon: 'pi pi-fw pi-building',
        routerLink: '/sector',
        visible: visiblty,
      },
      {
        label: 'Location',
        icon: 'pi pi-fw pi-map',
        visible: visiblty,
        items: [
          {
            label: 'Location List',
            routerLink: '/location-list',
            visible: visiblty,
          },
          {
            label: 'Add Location',
            icon: 'pi pi-fw pi-plus',
            visible: visiblty,
            items: [
              {
                label: 'Country',
                routerLink: '/country',
                visible: visiblty,
              },
              {
                label: 'City',
                routerLink: '/city',
                visible: visiblty,
              },
              {
                label: 'District',
                routerLink: '/district',
                visible: visiblty,
              },
              {
                label: 'Village',
                routerLink: '/village',
                visible: visiblty,
              },
            ],
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        routerLink: '/user',
        visible: visiblty,
      },
      { separator: true },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        visible: visiblty,
      },
    ];
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
