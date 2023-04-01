import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import autoTable from 'jspdf-autotable';
import { AddEditProductComponent } from '../product/add-edit-product/add-edit-product.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from './user';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    UserEditComponent,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User[] = [];
  displayAddEditModal = false; //ekleme ekranının görünürlüğü
  selectedUser: any = null;
  subscriptions: Subscription[] = [];
  Usersubscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.Usersubscriptions = this.userService
      .getUser()
      .subscribe((response) => {
        //getUser bir observable nesnesi döndürür(User[])
        //.subscribe ile bu nesneye abone olunur ve sonuçlar response değişkeninde saklanır
        this.user = response;
        //user burada güncellenir, çünkü dbden alınmış bilgiler üstte response'a atanmıştır.
        this.user = [...this.user];
        //!iste burasını anlamadım ya
      });
    console.log(this.user);
    this.subscriptions.push(this.Usersubscriptions);
    //güncel alınan veriler usersubscripons objesinden subscriptions dizisine pushlanır.
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedUser = null;
    //modali açtığında boş gelir
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateProductToList(newData: any) {
    this.getUserList();
    //data gelince sayfa
  }

  showEditModal(user: User) {
    this.displayAddEditModal = true;
    this.selectedUser = user;
    //tıklanan mevcut producti gösterir.
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          (response) => {
            this.user = this.user.filter((data) => data.id !== user.id);
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
      const worksheet = xlsx.utils.json_to_sheet(this.user);
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
    for (var i = 0; i < this.user.length; i++) {
      data.push([this.user[i].name, this.user[i].lastname, this.user[i].phone]);
    }
    return data;
  }
}
