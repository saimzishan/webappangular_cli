import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import{ModalComponent} from './components/modal.component';
import { UIService } from './services/ui.service';
//import {TranslateModule} from "ng2-translate";

import {TranslateModule} from  '@ngx-translate/core';
//import {TranslateModule} from '@ngx-translate/core';
@NgModule({
    imports: [RouterModule, CommonModule],
    exports: [ModalComponent,],
    declarations: [ModalComponent],
    providers: [UIService],
})
export class SharedModule { }
