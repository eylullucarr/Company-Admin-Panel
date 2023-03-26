import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
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
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  AddRegister() {
    console.log(this.registerForm.value);
    this.loginService.addUser(this.registerForm.value).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Register Succeeded',
          detail: 'The new admin has been successfully created.',
        });
        this.router.navigate(['login']);
      },
      (error) => {
        console.log('Errror occured');
      }
    );
  }
}
