import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { Country } from '../country/country';
import { CountryService } from '../country/country.service';
import { City } from './city';
import { CityService } from './city.service';
import { EditCityComponent } from './edit-city/edit-city.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  standalone: true,
  imports: [
    EditCityComponent,
    CommonModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    FormsModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class CityComponent implements OnChanges, OnInit, OnDestroy {
  city: City[] = [];
  country: Country[] = [];
  uniqueCountries: string[] = [];
  cityForm: FormGroup;
  subscriptions: Subscription[] = [];
  Citysubscriptions: Subscription = new Subscription();
  clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  selectedCity: any = null;
  selectedCountry: any = null;
  displayAddEditModal: boolean = false;

  constructor(
    private countryservice: CountryService,
    private cityservice: CityService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.cityForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  getCityList = () => {
    this.Citysubscriptions = this.cityservice
      .getCity()
      .subscribe((response) => {
        this.city = response;
        this.city = [...this.city];
      });
    console.log(this.city);
    this.subscriptions.push(this.Citysubscriptions);
  };
  ngOnInit(): void {
    this.countryservice.getCountry().subscribe((data) => {
      this.country = data; //urlden çektiği dataları location dizisine atiyor.
      this.uniqueCountries = Array.from(new Set(data.map((l) => l.country)));
      //(data.map((l) => l.country)) datadaki her bir öğeye l diyor. sonra her l'nin county
      //özelliğini alıp map metodu tüm objeler için tekrarlar.Yani biz burada tüm objelerin
      //counrty bilgisini aldık. array.from ile bu verileri diziye atılır AMA buradaki
      //new set ile benzersiz değerler sadece seçilir.
      //(map)=>countryleri toplayarak dizi yapar
      //(new set)=>countryleri distinctler,bir veri yapısı
      //(array.form)=>distictlenen verilerin dizileşmesini sağlar
    });
    this.getCityList();
  }

  ngOnChanges(): void {
    if (this.selectedCity) {
      this.cityForm.patchValue(this.selectedCity);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateProductToList(newData: any) {
    this.getCityList();
    //data gelince sayfa
  }

  showEditModal(city: City) {
    this.displayAddEditModal = true;
    this.selectedCity = city;
    //tıklanan mevcut producti gösterir.
  }

  ClearData() {
    this.cityForm.reset();
  }

  AddCountry() {
    console.log(this.cityForm.value);
    this.cityservice.AddCity(this.cityForm.value).subscribe(
      (response) => {
        this.clickAddEdit.emit(response);
        console.log(response);
        this.saveOrUpdateProductToList(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Via MessageService',
        });
        this.cityForm.reset();
      },
      (error) => {
        console.log('Errror occured');
      }
    );
  }

  DeleteCity(city: City) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.cityservice.DeleteCity(city.id).subscribe(
          (response) => {
            this.city = this.city.filter((data) => data.id !== city.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The Sector is successfully deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'The Sector is can deleted',
              ////////////////!!!!
            });
          }
        );
      },
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
