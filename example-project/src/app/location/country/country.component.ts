import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
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
import { Subscription } from 'rxjs';
import { Country } from './country';

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
  country: Country[] = [];
  countryForm: FormGroup;

  constructor(
    private countryservice: CountryService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.countryForm = this.fb.group({
      countryId: [''],
      country: [''],
    });
  }

  AddCountry() {
    this.country = this.countryForm.value;
    console.log(this.country);

    this.countryservice.AddEditCountry(this.country).subscribe(
      (response) => {
        console.log(response);
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
