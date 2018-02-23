import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { AppComponent }   from './app.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientViewComponent } from './components/patient/patient-view.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorViewComponent } from './components/doctor/doctor-view.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentViewComponent } from './components/appointment/appointment-view.component';
import { routes } from './modules/company/company.routing';



const appRoutes: Routes = [
  { path: '', component: DashboardComponent, data:{roles: ['2', '4', '18']}, canActivate:[AuthGuard] },
  { path: 'home',  component: AppComponent },
  { path: 'dashboard',  component: DashboardComponent, data:{roles: ['2', '4', '18']}, canActivate:[AuthGuard]},
  { path: 'patient', component: PatientComponent },
  { path: 'patientView', component: PatientViewComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'doctorView', component: DoctorViewComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'appointmentView', component: AppointmentViewComponent },
  ...routes

];


@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
