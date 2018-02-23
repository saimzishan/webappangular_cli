import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppoinmentService } from './services/appoinment.service';
import { SelectModule } from 'ng2-select';
import {TranslateModule} from 'ng2-translate';
import { CustomFormsModule } from 'ng2-validation';
import { AppoinmentRoutingModule , appoinmentRoutedComponents} from './appoinment.routing';
import { SharedModule } from '../shared/shared.module';
import {PopoverModule} from 'ng2-popover';

import {MatTabsModule} from '@angular/material';
import { CalendarModule } from 'angular-calendar';

// import { FileSelectDirective } from 'ng2-file-upload';
@NgModule({
    imports: [ReactiveFormsModule, PopoverModule,
      CommonModule, FormsModule, CustomFormsModule, RouterModule, MatTabsModule,
      AppoinmentRoutingModule, SharedModule, SelectModule, TranslateModule.forRoot(),
      CalendarModule.forRoot(),
    ],
    exports: [],
      declarations: [appoinmentRoutedComponents],
    providers: [ AppoinmentService ]
})
export class AppoinmentModule { }
