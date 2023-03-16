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
  template: `<p-dialog
      header="Edit Country"
      [(visible)]="displayAddEditModal"
      [modal]="true"
      [style]="{ width: '50vw' }"
      [draggable]="false"
      [resizable]="false"
      (onHide)="closeModal()"
    >
      <form [formGroup]="countryEditForm">
        <div class="field">
          <label class="block" for="country">Country</label>
          <input
            type="text"
            pInputText
            id="country"
            formControlName="country"
          />
          <small
            class="p-error block"
            *ngIf="
              countryEditForm.controls['country'].invalid &&
              countryEditForm.controls['country'].dirty
            "
            >Field is required</small
          >
        </div>
      </form>
      <ng-template pTemplate="footer">
        <p-button
          (click)="closeModal()"
          label="Cancel"
          styleClass="p-button-text"
        ></p-button>

        <p-button
          (click)="EditCountry()"
          label="Edit"
          [disabled]="countryEditForm.invalid"
        ></p-button>
      </ng-template>
    </p-dialog>

    <p-toast position="bottom-center"></p-toast>`,
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
