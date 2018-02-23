import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material';
import { CompanyService } from './services/company.service';
import { CompanyRoutingModule , companyRoutedComponents} from './company.routing';

import {TranslateModule} from "ng2-translate";
import { SharedModule } from '../shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';
import { NguiMapModule} from '@ngui/map';




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule,
        RouterModule,
        MatTabsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA8_ajAf8g4OXw40sdi5EvGIEZrO3MrcMA'}),        
        CompanyRoutingModule,
        SharedModule,
        TranslateModule.forRoot()],
    exports: [],
    declarations: [companyRoutedComponents],
    providers:[CompanyService]
})
export class CompanyModule { }