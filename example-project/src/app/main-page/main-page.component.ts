import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `<h1>Welcome!</h1>`,
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MainPageComponent {}
