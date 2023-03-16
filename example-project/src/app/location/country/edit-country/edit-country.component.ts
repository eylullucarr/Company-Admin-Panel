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
import { ProductService } from 'src/app/product/product.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
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
export class EditCountryComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCountry: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  countryEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private countryservice: CountryService,
    private messageService: MessageService
  ) {
    this.countryEditForm = this.fb.group({
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedCountry) {
      this.countryEditForm.patchValue(this.selectedCountry);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  closeModal() {
    this.countryEditForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>product.compenent.html
  }

  EditCountry() {
    console.log(this.countryEditForm.value);
    this.countryservice
      .EditCountry(this.countryEditForm.value, this.selectedCountry)
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
