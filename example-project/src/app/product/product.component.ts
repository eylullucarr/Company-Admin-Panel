import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    AddEditProductComponent,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  Ptdsubscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.Ptdsubscriptions = this.productService
      .getProducts()
      .subscribe((response) => {
        this.products = response;
        this.products = [...this.products];
      });
    this.subscriptions.push(this.Ptdsubscriptions);
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveOrUpdateProductToList(newData: any) {
    this.getProductList();
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(
          (response) => {
            this.products = this.products.filter(
              (data) => data.id !== product.id
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_excel');
  }

  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const head = [['Code', 'Explanation']];

    autoTable(doc, {
      head: head,
      body: this.toPdfFormat(),
      didDrawCell: (data: any) => {},
    });
    doc.save('product_pdf.pdf');
  }

  toPdfFormat() {
    let data = [];
    for (var i = 0; i < this.products.length; i++) {
      data.push([this.products[i].code, this.products[i].explanation]);
    }
    return data;
  }
}
