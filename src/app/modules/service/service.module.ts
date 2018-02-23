import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceService } from './services/service.service';
import { SelectModule } from 'ng2-select';
import {PopoverModule} from "ng2-popover";

//import {TranslateModule} from  '@ngx-translate/core';
import {TranslateModule} from "ng2-translate";
import { serviceRoutingModule , serviceRoutedComponents} from './service.routing';

import {MatTabsModule} from '@angular/material';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    imports: [ CommonModule,PopoverModule, FormsModule, ReactiveFormsModule, RouterModule,MatTabsModule, serviceRoutingModule,SharedModule,SelectModule,TranslateModule.forRoot()],
    exports: [],
    declarations: [serviceRoutedComponents],
    providers:[ServiceService]
})
export class ServiceModule { }
