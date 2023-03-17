import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Country } from '../../country/country';
import { CountryService } from '../../country/country.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
})
export class EditCityComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCity: any = null;
  @Input() selectedCountry: any = null;
  @Input() country: Country[] = [];
  @Input() uniqueCountries: any = null;

  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  cityEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cityservice: CityService,
    private countryservice: CountryService,
    private messageService: MessageService
  ) {
    this.cityEditForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.countryservice.getCountry().subscribe((data) => {
      this.country = data; //urlden çektiği dataları location dizisine atiyor.
      this.uniqueCountries = Array.from(new Set(data.map((l) => l.country)));
    });
  }

  ngOnChanges(): void {
    if (this.selectedCity) {
      this.cityEditForm.patchValue(this.selectedCity);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  closeModal() {
    this.cityEditForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>product.compenent.html
  }

  EditCity() {
    console.log(this.cityEditForm.value);
    this.cityservice
      .EditCity(this.cityEditForm.value, this.cityEditForm)
      .subscribe(
        (response) => {
          this.clickAddEdit.emit(response);
          //verileri clickaddedite atar.
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Via MessageService',
          });
        },
        (error) => {
          console.log('Errror occured');
        }
      );
  }
}
