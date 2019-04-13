import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingProviders, routing} from './app-routing';
import { AppComponent } from './app.component';
import { FarmerSideComponent } from './components/farmer-side/farmer-side.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonatorSideComponent } from './components/donator-side/donator-side.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { ParticlesComponent } from './particles/particles.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmerSideComponent,
    DashboardComponent,
    DonatorSideComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ParticlesComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
