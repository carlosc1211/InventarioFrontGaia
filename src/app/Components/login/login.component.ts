import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    Usuario: '',
    Contrasenya: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

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
        }, 1000);
        
      }
    });
  }

  goToLaunchapad(){
    this.router.navigate(['/launchpad']);
  }
}
