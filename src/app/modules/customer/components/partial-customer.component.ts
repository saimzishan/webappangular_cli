import {Component, Input, OnInit, ElementRef, AfterViewInit, Output, EventEmitter, Directive} from '@angular/core';
import { CustomerModel } from '../models/customer.model';
import { UIService } from '../../shared/services/ui.service';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { BranchService } from '../../branch/services/branch.service';
import { DepartmentService } from '../../department/services/department.service';
import { RoleService } from '../../role/services/role.service';
import { CustomerService } from '../services/customer.service';

import { CompanyService } from '../../company/services/company.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import { ModelFormComponent } from '../../../components/appointment/model-form/model-form.component';
const URL = 'http://backoffice.istanbul/api//certificates/certificate/';


declare var $: any;
@Component({
    selector: 'partial-employee',
    templateUrl: '../templates/partial-customer.component.html',
    styles: [`
      .ng-valid[required], .ng-valid.required  {
        border-color: #42A948; /* green */
      }

      .ng-invalid:not(form)  {
        border-color: #a94442; /* red */
      }
      .liDisabled {
        pointer-events:none; //This makes it not clickable
        opacity:0.6;         //This grays it out to look disabled
      }
      .customColor {
        background-color: #E7EAF0;
        padding-top: 2%;
        margin-bottom: 10px;
      }
      .customPadding {
        padding-top: 2px;
      }
    `],
  providers: [CustomerService],
})


export class PartialCustomerComponent implements OnInit {
  ngOnInit(): void {
 
  }
}