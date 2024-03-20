import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LaunchpadComponent } from './Components/launchpad/launchpad.component';
import { InventarioComponent } from './Components/inventario/inventario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'launchpad', component: LaunchpadComponent },
  { path: 'inventario', component: InventarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
