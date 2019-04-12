import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FarmerSideComponent } from './farmer-side/farmer-side.component';
import { DonatorSideComponent } from './donator-side/donator-side.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'farmer', component: FarmerSideComponent },
    { path: 'donator', component: DonatorSideComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);