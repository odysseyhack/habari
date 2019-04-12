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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MimeaNavComponent } from './mimea-nav/mimea-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FarmerSideComponent,
    DonatorSideComponent,
    MimeaNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KonamiModule,
    routing,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
