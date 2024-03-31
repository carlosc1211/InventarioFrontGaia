import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  ) {}

  submitForm() {
    const usuario = {
      Usuario: this.formData.Usuario,
      Contrasenya: this.formData.Contrasenya,
    };
    debugger

    this.authService.login(usuario).subscribe((response) => {
      console.log(response.token);
      if (response.token!='' && response.token!=null && response.token!=undefined) {
        this.router.navigate(['/launchpad']);
      }
    });
  }
}
