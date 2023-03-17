import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditDistrictComponent } from './edit-district/edit-district.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  standalone: true,
  imports: [CommonModule, EditDistrictComponent],
})
export class DistrictComponent {}
