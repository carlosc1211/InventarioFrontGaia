import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LaunchpadComponent } from './Components/launchpad/launchpad.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { InventarioComponent } from './Components/inventario/inventario.component';
import { InventarioListComponent } from './Components/inventario/inventarioList/inventario-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpinnerInterceptor } from './Service/SpinnerInterceptor';
import { SellingComponent } from './Components/selling/selling.component';
import { UsersComponent } from './Components/users/users.component';
import { ReservedComponent } from './Components/reserved/reserved.component';
import { AddUsersComponent } from './Components/users/add-users/add-users/add-users.component';
import { InventarioAddItemComponent } from './Components/inventario/inventario-add-item/inventario-add-item.component';
import { ClientComponent } from './Components/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LaunchpadComponent,
    NavbarComponent,
    InventarioComponent,
    InventarioListComponent,
    InventarioAddItemComponent,
    SellingComponent,
    UsersComponent,
    ReservedComponent,
    AddUsersComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    StyleClassModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule,
    TooltipModule,
    ToolbarModule,
    ProgressSpinnerModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    InputNumberModule,
    ConfirmDialogModule,
    DropdownModule,
    TreeTableModule,
    MultiSelectModule,
    CheckboxModule,
    RadioButtonModule,
    TagModule,
    PanelModule,
    DividerModule,
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
