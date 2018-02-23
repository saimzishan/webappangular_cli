import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { VersionRoutingModule , VersionRoutedComponents} from './version.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, VersionRoutingModule],
    exports: [],
    declarations: [VersionRoutedComponents],
    providers:[],
})
export class VersionModule { }