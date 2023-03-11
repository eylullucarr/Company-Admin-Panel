import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
import { response } from 'express';
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
      this.location = data;
      this.uniqueCountries = Array.from(new Set(data.map((l) => l.country)));
    });
  }

  onSelectionChange(event: any) {
    console.log('Selected country: ', this.selectedCountry);
    const filteredLocations = this.location.filter(
      (l) => l.country === this.selectedCountry
    );
    console.log('Filtered location: ', filteredLocations);
  }

  getCities(selectedCountry: string): string[] {
    return this.location
      .filter((l) => l.country === selectedCountry)
      .map((l) => l.city)
      .filter((value, index, self) => self.indexOf(value) === index);
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
