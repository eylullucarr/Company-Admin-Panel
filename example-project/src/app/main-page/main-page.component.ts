import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  template: `<p>Welcome!</p>`,
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MainPageComponent {}
