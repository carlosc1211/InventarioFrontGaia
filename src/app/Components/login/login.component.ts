import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Service/auth.service';
import { SpinnerService } from 'src/app/Service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formData = {
    Usuario: '',
    Contrasenya: '',
  };

    showSpinner: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.spinnerSubject.subscribe((show: boolean) => {
      this.showSpinner = show;
    });
  }

  submitForm() {
    const usuario = {
      Usuario: this.formData.Usuario,
      Contrasenya: this.formData.Contrasenya,
    };
    this.authService.login(usuario).subscribe((response) => {
      if (response.token!='' && response.token!=null && response.token!=undefined) {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Welcome' });

        setTimeout(() => {
          this.goToLaunchapad();
        }, 5000);  
      }else{
        this.messageService.add({ severity: 'error', summary: '', detail: 'Error login' });
      }
    });
  }

  goToLaunchapad(){
    this.router.navigate(['/launchpad']);
  }
}
