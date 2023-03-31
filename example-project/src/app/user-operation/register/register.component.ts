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
import { v4 as uuidv4 } from 'uuid';
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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^(05[0-9]{9})$')]],
    guidID: [''],
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
    if (
      this.registerForm.value.password === this.registerForm.value.password2
    ) {
      this.registerForm.value.guidID = uuidv4();
      console.log(this.registerForm.value.guidID + 's');
      this.loginService.addUser(this.registerForm.value).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Succeeded',
            detail: 'Login Been Successfully',
          });
          this.router.navigate(['login']);
        },
        (error) => {
          console.log('Errror occured');
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Succeeded',
        detail: 'Login Been Successfully',
      });
    }
  }
  ///error ekle
}
