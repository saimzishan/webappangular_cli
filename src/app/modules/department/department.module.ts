import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DepartmentService } from './services/department.service';
import { SelectModule } from 'ng2-select';
import {TranslateModule} from "ng2-translate";
//import {TranslateModule} from  '@ngx-translate/core';
import { departmentRoutingModule , departmentRoutedComponents} from './department.routing';

import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, departmentRoutingModule,SharedModule,SelectModule,TranslateModule.forRoot()],
    exports: [],
    declarations: [departmentRoutedComponents],
    providers:[DepartmentService]
})
export class DepartmentModule { }