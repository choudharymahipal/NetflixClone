import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfterLoginComponent } from './Components/after-login/after-login.component';
import { BeforeLoginComponent } from './Components/before-login/before-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AfterLoginComponent,
    BeforeLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
