import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CountryService } from './country.service';
import { CardModule } from 'primeng/card';
import { Country } from './country';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TableModule,
    EditCountryComponent,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class CountryComponent implements OnInit, OnChanges, OnDestroy {
  country: Country[] = [];
  countryForm: FormGroup;
  subscriptions: Subscription[] = [];
  Countrysubscriptions: Subscription = new Subscription();
  clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  selectedCountry: any = null;
  displayAddEditModal: boolean = false;

  constructor(
    private countryservice: CountryService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.countryForm = this.fb.group({
      country: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getCountryList = () => {
    this.Countrysubscriptions = this.countryservice
      .getCountry()
      .subscribe((response) => {
        this.country = response;
        this.country = [...this.country];
      });
    console.log(this.country);
    this.subscriptions.push(this.Countrysubscriptions);
  };
  ngOnInit(): void {
    this.getCountryList();
  }

  ngOnChanges(): void {
    if (this.selectedCountry) {
      this.countryForm.patchValue(this.selectedCountry);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateProductToList(newData: any) {
    this.getCountryList();
    //data gelince sayfa
  }

  showEditModal(country: Country) {
    this.displayAddEditModal = true;
    this.selectedCountry = country;
    //tıklanan mevcut producti gösterir.
  }

  AddCountry() {
    console.log(this.countryForm.value);
    this.countryservice.AddCountry(this.countryForm.value).subscribe(
      (response) => {
        this.clickAddEdit.emit(response);
        console.log(response);
        this.saveOrUpdateProductToList(response);
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

  deleteCountry(country: Country) {
    console.log(country);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.countryservice.deleteCountry(country.id).subscribe(
          (response) => {
            this.country = this.country.filter(
              (data) => data.id !== country.id
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
}
