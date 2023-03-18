import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { VillageService } from '../village.service';

@Component({
  selector: 'app-edit-village',
  templateUrl: './edit-village.component.html',
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
export class EditVillageComponent {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedVillage: any = null;
  @Input() selectedCountry: any = null;
  @Input() uniqueCountries: any = null;

  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  villageEditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private villageservice: VillageService,
    private messageService: MessageService
  ) {
    this.villageEditForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      village: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedVillage) {
      this.villageEditForm.patchValue(this.selectedVillage);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    }
  }

  closeModal() {
    this.villageEditForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>product.compenent.html(bu yüzden output olarak kullanıyoruz.)
  }

  EditVillage() {
    console.log(this.villageEditForm.value);
    this.villageservice
      .EditVillage(this.villageEditForm.value, this.selectedVillage)
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
