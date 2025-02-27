import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginComponent } from './Components/after-login/after-login.component';
import { BeforeLoginComponent } from './Components/before-login/before-login.component';

const routes: Routes = [
  { path: 'beforelogin', component: BeforeLoginComponent },
  { path: 'afterlogin', component: AfterLoginComponent },
  { path: '', redirectTo: '/beforelogin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
