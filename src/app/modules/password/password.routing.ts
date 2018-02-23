import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';

import { ChangePasswordComponent } from './components/change-password.component';
import { ForgotPassEmailComponent } from './components/forgot-pass-email.component'; 
import { ForgotPasswordComponent } from './components/forgot-password.component'; 

const routes: Routes = [
    { path: 'changePassword', component: ChangePasswordComponent, canActivate:[AuthGuard] },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'forgotPassEmail', component: ForgotPassEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class PasswordRoutingModule { }

export const passwordRoutedComponents = [ChangePasswordComponent, ForgotPassEmailComponent, ForgotPasswordComponent];