import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleService } from './services/role.service';
import { roleRoutingModule , roleRoutedComponents} from './role.routing';

//import {TranslateModule} from  '@ngx-translate/core';
import {TranslateModule} from "ng2-translate";
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, roleRoutingModule,SharedModule,TranslateModule.forRoot()],
    exports: [],
    declarations: [roleRoutedComponents],
    providers:[RoleService]
})
export class RoleModule { }