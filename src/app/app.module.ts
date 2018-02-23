import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler } from '@angular/core';

import { LoggerService, CustomErrorHandler } from './custom-error.handler';
import { AppComponent }  from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { AuthGuard } from './guard/auth.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { environment } from './environments/environment';
import { MessagingService } from './messaging.service';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientComponent } from './components/patient/patient.component';
import { PatientViewComponent } from './components/patient/patient-view.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorViewComponent } from './components/doctor/doctor-view.component';
import { SharedService } from './shared.service';
import { CompanyModule } from './modules/company/company.module';
import { EntryModule } from './modules/entry/entry.module';
import { PasswordModule } from './modules/password/password.module';

import { BranchModule } from './modules/branch/branch.module';
import { RoleModule } from './modules/role/role.module';
import { DepartmentModule } from './modules/department/department.module';

import { VersionModule } from './modules/version/version.module';

import { ServiceModule } from './modules/service/service.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { CustomerModule } from './modules/customer/customer.module';
import {TranslateModule} from "ng2-translate";
import { CustomFormsModule } from 'ng2-validation';
import {PopoverModule} from "ng2-popover";
import { AgmCoreModule } from '@agm/core';
import { NguiMapModule} from '@ngui/map';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponents } from './components/sheared/components/modal.components';
import { ModelFormComponent } from './components/appointment/model-form/model-form.component';
import {NewCustomerComponent} from './components/sheared/components/newCustomer.component';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppoinmentModule} from './modules/appoinments/appoinment.module';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {AppointmentViewComponent} from './components/appointment/appointment-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    PatientViewComponent,
    DoctorComponent,
    DoctorViewComponent,
    ModalComponents,
    ModelFormComponent,
    NewCustomerComponent,
    AppointmentComponent,
    AppointmentViewComponent
  ],
  entryComponents: [NewCustomerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    PopoverModule,
    HttpClientModule,
    NgProgressModule,
    AppRoutingModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA8_ajAf8g4OXw40sdi5EvGIEZrO3MrcMA'}),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyA8_ajAf8g4OXw40sdi5EvGIEZrO3MrcMA'}),
    CompanyModule,
    EntryModule,
    PasswordModule,
    VersionModule,
    BranchModule,
    RoleModule,
    DepartmentModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    EmployeeModule,
    CustomerModule,
    ServiceModule,
    AppoinmentModule,
  ],
  providers: [
              {provide: LocationStrategy, useClass: HashLocationStrategy},
              { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
                MessagingService , SharedService,
                LoggerService,
              {provide: ErrorHandler, useClass: CustomErrorHandler},
              {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
  bootstrap: [AppComponent]

})

export class AppModule { }
