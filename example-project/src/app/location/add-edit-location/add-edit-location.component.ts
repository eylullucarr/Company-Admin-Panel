import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [],
})
export class AddEditLocationComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true; //Parent → Child
  @Input() selectedLocation: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = 'Add';

  locationForm = this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required],
    village: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedLocation) {
      this.modalType = 'Edit';
      this.locationForm.patchValue(this.selectedLocation);
    } else {
      this.locationForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.locationForm.reset();
    this.clickClose.emit(true);
  }

  addEditLocation() {
    this.locationService
      .AddEditLocation(this.locationForm.value, this.selectedLocation)
      .subscribe(
        (response) => {
          this.clickAddEdit.emit(response);
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
