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
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
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
export class EditDistrictComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedDistrict: any = null;
  @Input() selectedCountry: any = null;
  @Input() uniqueCountries: any = null;

  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  districtEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private districtservice: DistrictService,
    private messageService: MessageService
  ) {
    this.districtEditForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedDistrict) {
      console.log(this.selectedDistrict);
      this.districtEditForm.patchValue(this.selectedDistrict);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  closeModal() {
    this.districtEditForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>product.compenent.html
  }
  EditDistrict() {
    console.log(this.districtEditForm.value);
    this.districtservice
      .EditDistrict(this.districtEditForm.value, this.selectedDistrict)
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
