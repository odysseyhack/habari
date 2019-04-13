import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmerSideComponent } from './components/farmer-side/farmer-side.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonatorSideComponent } from './components/donator-side/donator-side.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmerSideComponent,
    DashboardComponent,
    DonatorSideComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
