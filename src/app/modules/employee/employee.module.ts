import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { SelectModule } from 'ng2-select';
import {TranslateModule} from 'ng2-translate';
import { CustomFormsModule } from 'ng2-validation';
import { employeeRoutingModule , employeeRoutedComponents} from './employee.routing';
import { SharedModule } from '../shared/shared.module';
import {PopoverModule} from 'ng2-popover';

import {MatTabsModule} from '@angular/material';

// import { FileSelectDirective } from 'ng2-file-upload';
@NgModule({
    imports: [ReactiveFormsModule, PopoverModule,
      CommonModule, FormsModule, CustomFormsModule, RouterModule, MatTabsModule,
      employeeRoutingModule, SharedModule, SelectModule, TranslateModule.forRoot()],
    exports: [],
      declarations: [employeeRoutedComponents],
    providers: [ EmployeeService ]
})
export class EmployeeModule { }
