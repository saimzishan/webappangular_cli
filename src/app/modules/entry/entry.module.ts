import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EntryService } from './services/entry.service';
import { SelectModule } from 'ng2-select';

import { EntryRoutingModule , entryRoutedComponents} from './entry.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, EntryRoutingModule,SelectModule],
    exports: [],
    declarations: [entryRoutedComponents],
    providers:[EntryService]
})
export class EntryModule { }