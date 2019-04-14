import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appRoutingProviders, routing} from './app-routing';
import { AppComponent } from './app.component';
import { FarmerSideComponent } from './components/farmer-side/farmer-side.component';
import {DialogOverviewExampleDialog } from './components/farmer-side/Dialog-component/dialog-overview-example-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonatorSideComponent } from './components/donator-side/donator-side.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule, MatExpansionModule, MatNativeDateModule, MatInputModule, MatTableModule } from '@angular/material';
import { MatCardModule, MatToolbarModule, MatIconModule, MatDialogModule} from '@angular/material';
import { DemandComponent } from './components/dashboard/demand/demand.component';
import { SupplyComponent } from './components/dashboard/supply/supply.component';
import { TransitComponent } from './components/dashboard/transit/transit.component';
import { RealizedComponent } from './components/dashboard/realized/realized.component';

@NgModule({
  entryComponents: [DialogOverviewExampleDialog],
  declarations: [
    AppComponent,
    FarmerSideComponent,
    DashboardComponent,
    DonatorSideComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DialogOverviewExampleDialog,
    DemandComponent,
    SupplyComponent,
    TransitComponent,
    RealizedComponent
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


