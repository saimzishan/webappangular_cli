import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import {BranchService } from './services/branch.service';
import { BranchRoutingModule , branchRoutedComponents} from './branch.routing';

import {MatTabsModule} from '@angular/material';
import {TranslateModule} from "ng2-translate";
import { AgmCoreModule } from '@agm/core';
import { NguiMapModule} from '@ngui/map';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';


@NgModule({
    imports: [
        CommonModule,
        CustomFormsModule,
        FormsModule,
        RouterModule,
        MatTabsModule,
        BranchRoutingModule,
        SelectModule,
        SharedModule,
        TranslateModule.forRoot(),
        CalendarModule.forRoot(),
      NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA8_ajAf8g4OXw40sdi5EvGIEZrO3MrcMA'}),
        AgmCoreModule.forRoot({apiKey:'AIzaSyA8_ajAf8g4OXw40sdi5EvGIEZrO3MrcMA'}),
    ],
    exports: [],
    declarations: [branchRoutedComponents],
    providers:[BranchService]
})
export class BranchModule { }
