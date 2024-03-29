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
import { City } from '../city/city';
import { CityService } from '../city/city.service';
import { Country } from '../country/country';
import { District } from './district';
import { DistrictService } from './district.service';
import { EditDistrictComponent } from './edit-district/edit-district.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditDistrictComponent,
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
export class DistrictComponent implements OnChanges, OnInit, OnDestroy {
  city: City[] = [];
  country: Country[] = [];
  district: District[] = [];
  location: City[] = [];
  uniqueCountries: string[] = [];
  districtForm: FormGroup;
  subscriptions: Subscription[] = [];
  Districtsubscriptions: Subscription = new Subscription();
  clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  selectedCountry: any = null;
  selectedCity: any = null;
  selectedDistrict: any = null;
  displayAddEditModal: boolean = false;

  constructor(
    private districtservice: DistrictService,
    private cityservice: CityService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.districtForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  getDistrictList = () => {
    this.Districtsubscriptions = this.districtservice
      .getDistrict()
      .subscribe((response) => {
        this.district = response;
        this.district = [...this.district];
      });
    console.log(this.district);
    this.subscriptions.push(this.Districtsubscriptions);
  };

  ngOnInit(): void {
    this.cityservice.getCity().subscribe((data) => {
      this.location = data; //urlden çektiği dataları location dizisine atiyor.
      this.uniqueCountries = Array.from(new Set(data.map((l) => l.country)));
      //(data.map((l) => l.country)) datadaki her bir öğeye l diyor. sonra her l'nin county
      //özelliğini alıp map metodu tüm objeler için tekrarlar.Yani biz burada tüm objelerin
      //counrty bilgisini aldık. array.from ile bu verileri diziye atılır AMA buradaki
      //new set ile benzersiz değerler sadece seçilir.
      //(map)=>countryleri toplayarak dizi yapar
      //(new set)=>countryleri distinctler,bir veri yapısı
      //(array.form)=>distictlenen verilerin dizileşmesini sağlar
    });
    this.getDistrictList();
  }

  onSelectionChange(event: any) {
    console.log('Selected country: ', this.selectedCountry);
    const filteredLocations = this.location.filter(
      (l) => l.country === this.selectedCountry
    );
    //yukarıda datadaki değerledi locationa atmıştık.
    //this.location.filter diyerek bu değerlerin hepsini l ye atiyoruz. daha sonrasında
    //l 'deki tüm objeleri  obejeler bitene kadar seçilen ülkenin ismi ile karşıalştırıyoruz
    //true dönenler l objelerini de filteredlocations a atiyoruz
    console.log('Filtered location: ', filteredLocations);
  }

  getCities(selectedCountry: string): string[] {
    return (
      this.location
        .filter((l) => l.country === selectedCountry)
        //location verilerini l parametresine verir. Ve l'deki objesinin country değerini
        //selectedcountry değerine eşit mi diye kontrol eder.
        .map((l) => l.city)
        //filterda true dönen objelerin city değerini map ile alır ve diziye dönüştürür.
        .filter((value, index, self) => self.indexOf(value) === index)
    );
    //Bu fonksiyon, her bir dizi elemanını kontrol eder ve elemanın dizideki ilk indeksini belirler (self.indexOf(value)). Eğer elemanın dizideki ilk indeksi, elemanın şu anki indeksiyle eşleşiyorsa (self.indexOf(value) === index), bu elemanın benzersiz olduğu anlamına gelir ve bu elemanı yeni dizide tutmak için true değeri döndürür. Eğer elemanın dizideki ilk indeksi, elemanın şu anki indeksiyle eşleşmiyorsa, bu elemanın daha önce dizide yer aldığı anlamına gelir ve bu elemanı yeni dizide tutmamak için false değeri döndürür.
  }

  ngOnChanges(): void {
    if (this.selectedDistrict) {
      this.districtForm.patchValue(this.selectedDistrict);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateProductToList(newData: any) {
    this.getDistrictList();
    //data gelince sayfa
  }

  showEditModal(district: District) {
    this.displayAddEditModal = true;
    this.selectedDistrict = district;
    //tıklanan mevcut producti gösterir.
  }

  ClearData() {
    this.districtForm.reset();
  }

  AddDistrict() {
    console.log(this.districtForm.value);
    this.districtservice.AddDistrict(this.districtForm.value).subscribe(
      (response) => {
        this.clickAddEdit.emit(response);
        console.log(response);
        this.saveOrUpdateProductToList(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Via MessageService',
        });
        this.districtForm.reset();
      },
      (error) => {
        console.log('Errror occured');
      }
    );
  }

  DeleteDistrict(district: District) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.districtservice.DeleteDistrict(district.id).subscribe(
          (response) => {
            this.district = this.district.filter(
              (data) => data.id !== district.id
            );
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
