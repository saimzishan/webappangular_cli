import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PasswordService } from './services/password.service';

import { PasswordRoutingModule , passwordRoutedComponents} from './password.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, PasswordRoutingModule],
    exports: [],
    declarations: [passwordRoutedComponents],
    providers:[PasswordService],
})
export class PasswordModule { }