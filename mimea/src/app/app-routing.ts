import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmerSideComponent } from './components/farmer-side/farmer-side.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonatorSideComponent } from './components/donator-side/donator-side.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'farmer-side', component: FarmerSideComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'donator-side', component: DonatorSideComponent},
  { path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
