import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { LoginService } from '../login.service';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    CardModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    private storageService: StorageServiceService
  ) {}

  ngOnInit(): void {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  generateToken(guidID: any) {
    const token = btoa(guidID); // UUID'yi Base64'e kodla
    this.storageService.setToken(token); // Tokeni Local Storage'a kaydet
  }

  Login() {
    this.loginService.getUser().subscribe(
      (response) => {
        console.log(response);
        const user = response.find((a: any) => {
          return (
            (a.username === this.loginForm.value.username &&
              a.password === this.loginForm.value.password) ||
            (a.email === this.loginForm.value.username &&
              a.password === this.loginForm.value.password)
          );
        });
        if (user) {
          this.generateToken(user.guidID);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Succeeded',
            detail: 'Login Been Successfully',
          });

          this.loginForm.reset();
        } else {
          this.messageService.add({
            severity: 'error  ',
            summary: 'Login  Failed',
            detail: 'Please chech your username and password!',
          });
          console.log('Errror occured');
        }
      },
      (error) => {
        console.log('Errror occured');
      }
    );
  }
}
