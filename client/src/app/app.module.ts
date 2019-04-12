import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { KonamiModule } from 'ngx-konami';
import { LoginComponent } from './login/login.component';
import { routing }        from './app.routing';
import { RegisterComponent } from './register/register.component';
import { FarmerSideComponent } from './farmer-side/farmer-side.component';
import { DonatorSideComponent } from './donator-side/donator-side.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FarmerSideComponent,
    DonatorSideComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KonamiModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
