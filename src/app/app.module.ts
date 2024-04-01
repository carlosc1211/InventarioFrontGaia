import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import {StyleClassModule} from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LaunchpadComponent } from './Components/launchpad/launchpad.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { InventarioComponent } from './Components/inventario/inventario.component';
import { InventarioListComponent } from './Components/inventario/inventarioList/inventario-list.component';
import { InventarioAddItemComponent } from './Components/inventario/inventarioItem/inventario-add-item/inventario-add-item.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LaunchpadComponent,
    NavbarComponent,
    InventarioComponent,
    InventarioListComponent,
    InventarioAddItemComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    StyleClassModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
