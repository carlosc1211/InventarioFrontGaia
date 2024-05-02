import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LaunchpadComponent } from './Components/launchpad/launchpad.component';
import { InventarioComponent } from './Components/inventario/inventario.component';
import { SellingComponent } from './Components/selling/selling.component';
import { UsersComponent } from './Components/users/users.component';
import { ReservedComponent } from './Components/reserved/reserved.component';
import { ClientComponent } from './Components/client/client.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'launchpad', component: LaunchpadComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'selling', component: SellingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reserved', component: ReservedComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
