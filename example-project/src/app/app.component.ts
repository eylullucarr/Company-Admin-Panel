import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OnChanges, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StorageServiceService } from './user-operation/storage-service.service';

@Component({
  selector: 'app-root',
  template: `
    <p-menubar [model]="items"></p-menubar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];
  title = 'example-project';

  constructor(
    private router: Router,
    private storageService: StorageServiceService
  ) {
    this.storageService.isLoged.subscribe((message: boolean) => {
      if (message == true) {
        this.fillMenu(message);
        this.router.navigate(['main-page']);
      } else {
        this.fillMenu(message);
        this.router.navigate(['login']);
      }
    });
    this.storageService.isLogout.subscribe((message: boolean) => {
      if (message == true) {
        this.fillMenu(!message);
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
    this.fillMenu(this.storageService.getToken());
    //!burayı yapamadım :( Alternatif yol bulundu ama event üzerinden kontrol gerçekleşmiyor

    //!nasıl sayfa yenilendiğinde herhangi bir sayfa değil de doğru sayfalar geliyor????
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
        command: () => {
          this.storageService.removeToken();
        },
        visible: visiblty,
      },
    ];
  }
}
