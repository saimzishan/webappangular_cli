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
import {EmployeeModel} from '../../employee/models/employee.model';
import {EmployeeService} from '../../employee/services/employee.service';
// const URL = 'http://backoffice.istanbul/api//certificates/certificate/';


declare var $: any;
@Component({
    selector: 'app-partial-calender',
    templateUrl: '../templates/partial-calender.component.html',
    styles: [``],
  providers: [AppoinmentService],
})


export class PartialCalenderComponent implements OnInit {
  public fdList: any;
  public editData: any;
  public fileDataLength: any;
  public  selected1 = false;
  public  selected2 = false;
  public date = new Date().toISOString().substring(0, 10);
  public customService = false;
  constructor() {
    // this.disabledArray = [5];
  }
  ngOnInit(): void {
    this.fdList = new Array<FileData>();
    this.editData = new EditData();
    this.fileDataLength = 0;
    this.customService = false;
    alert('hnn');
  }
  // setting customer array
  onChange(value) {
    if (value != 0) {
      this.fdList.push({
        name: value, id: null,
        check: true
      });
      this.fileDataLength = this.fdList.length;
    }
    if (value === 'Asad' ) {
      this.selected1 = true;
      // console.log(this.disabledArray[0]);
    } else if (value === 'Ali' ) {
      this.selected2 = true;
    }
    this.editData.customerName = 0;
    // console.log(this.disabledArray);
  }
  // setting customer array
  // removing item from array
  removeRecord(index, i) {
    if (index === 'Asad') {
      this.selected1 = false;
    }
    if (index === 'Ali') {
      this.selected2 = false;
    }
    this.editData.customerName = 0;
    this.fdList.splice(i, 1);
    this.fileDataLength = this.fdList.length;
  }
  // removing item from array
  // enable disable custom fields
  serviceChange(value) {
    if (value  === '3') {
      this.customService = true;
    } else {
      this.customService = false;
    }
  }
}
export class FileData {
  name: string;
  check = false;
  id: null;
}
export class EditData {
  customerName: string;
}
