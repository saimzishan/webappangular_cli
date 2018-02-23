import {Component, Input, OnInit, ElementRef, AfterViewInit, Output, EventEmitter, Directive} from '@angular/core';
import { UIService } from '../../shared/services/ui.service';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { BranchService } from '../../branch/services/branch.service';
import { DepartmentService } from '../../department/services/department.service';
import { RoleService } from '../../role/services/role.service';
import { AppoinmentService } from '../services/appoinment.service';

import { CompanyService } from '../../company/services/company.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
// const URL = 'http://backoffice.istanbul/api//certificates/certificate/';


declare var $: any;
@Component({
    selector: 'app-partial-appoinment',
    templateUrl: '../templates/partial-calender.component.html',
    styles: [``],
  providers: [AppoinmentService],
})


export class PartialAppoinmentComponent {
}
