import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { LocationService } from './location.service';
import { Location } from './location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class LocationComponent implements OnInit {
  location: Location[] = [];
  uniqueCountries: string[] = [];
  uniqueCities: string[] = [];
  selectedCountry!: string;
  selectedCity!: string;
  selectedDistrict!: string;
  selectedVillage!: string;

  constructor(private locationservice: LocationService) {}

  ngOnInit(): void {
    this.locationservice.getLocationList().subscribe((data) => {
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

  onSelectionChangeCity(event: any) {
    console.log('Selected City: ', this.selectedCity);
    const filteredLocations = this.location.filter(
      (l) => l.city === this.selectedCity
    );
    console.log('Filtered location: ', filteredLocations);
  }

  getDistrict(selectedCity: string): string[] {
    return this.location
      .filter((l) => l.city === selectedCity)
      .map((l) => l.district)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  onSelectionChangeDistrict(event: any) {
    console.log('Selected district: ', this.selectedDistrict);
    const filteredLocations = this.location.filter(
      (l) => l.district === this.selectedDistrict
    );
    console.log('Filtered location: ', filteredLocations);
  }

  getVillage(selectedDistrict: string): string[] {
    return this.location
      .filter((l) => l.district === selectedDistrict)
      .map((l) => l.village)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  onSelectionChangeVillage(event: any) {
    console.log('Selected village: ', this.selectedVillage);
    const filteredLocations = this.location.filter(
      (l) => l.village === this.selectedVillage
    );
    console.log('Filtered location: ', filteredLocations);
  }
}
