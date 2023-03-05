import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
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
import { TooltipModule } from 'primeng/tooltip';
import { AddEditLocationComponent } from './add-edit-location/add-edit-location.component';
import { LocationService } from './location.service';
import { response } from 'express';
import { Location } from './location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AddEditLocationComponent,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class LocationComponent implements OnInit, OnDestroy {
  ngOnInit(): void {}

  location: Location[] = [];
  displayAddEditModal = false;
  selectedLocation: any = false;
  subscriptions: Subscription[] = [];
  Lctsubscriptions: Subscription = new Subscription();

  constructor(
    private locationservice: LocationService,
    private confirmationService: ConfirmationService,
    private messadeService: MessageService
  ) {}

  getLocationList() {
    this.Lctsubscriptions = this.locationservice
      .getLocation()
      .subscribe((response) => {
        this.location = response;
        this.location = [...this.location];
      });
    this.subscriptions.push(this.Lctsubscriptions);
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedLocation = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveorUpdateLocationList(newData: any) {
    this.getLocationList();
  }

  showEditModal(location: Location) {
    this.displayAddEditModal = true;
    this.selectedLocation = location;
  }

  deleteLocation(location: Location) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this location?',
      accept: () => {
        this.locationservice.deleteLocation(location.id).subscribe(
          (response) => {
            this.location = this.location.filter(
              (data) => data.id !== location.id
            );
            this.messadeService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The Location is successfully deleted',
            });
          },
          (error) => {
            this.messadeService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'The Location is cant deleted',
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
}
