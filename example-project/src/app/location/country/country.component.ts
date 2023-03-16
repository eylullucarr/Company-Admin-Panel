import { Component, EventEmitter, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CountryService } from './country.service';
import { response } from 'express';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService, NgForm],
})
export class CountryComponent {
  clickAddEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private countryservice: CountryService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  countryForm = this.fb.group({
    countryId: [0, Validators.required],
    country: ['', Validators.required],
  });

  AddCountry() {
    console.log(this.countryForm.value);

    this.countryservice.AddEditCountry(this.countryForm.value).subscribe(
      (response) => {
        console.log(response);
        this.clickAddEdit.emit(response);
        //verileri clickaddedite atar.

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
    // console.log(data);
    // console.log(`value: ${this.countryForm.value}`); //object olarak gösteriyo anlamadım
    // console.log(this.countryForm.value);
  }
}
