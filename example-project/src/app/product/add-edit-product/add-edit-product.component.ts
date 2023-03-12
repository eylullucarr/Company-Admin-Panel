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
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
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
})
export class AddEditProductComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = 'Add';

  productForm = this.fb.group({
    code: [0, Validators.required],
    explanation: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      //edit modalini açar
      this.productForm.patchValue(this.selectedProduct);
      //productforma kendi verisini yerleştirmek için patchValue() kullanılır
    } else {
      this.productForm.reset();
      //productforma reset atar, yani kutucuklar boş gelir.
      this.modalType = 'Add';
      //add modalini açtırır
    }
  }

  closeModal() {
    this.productForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>product.compenent.html
  }

  addEditProduct() {
    this.productService
      .AddEditProduct(this.productForm.value, this.selectedProduct)
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
