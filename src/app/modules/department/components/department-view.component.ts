import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { DepartmentModel } from '../models/department.model';
import { DepartmentService } from '../services/department.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';
import {Result} from './partial-department.component'

import { DepartmentViewResponse } from '../models/department-view-response.model';
declare var $: any;

@Component({
    selector: 'department-view',
    templateUrl: '../templates/department-view.component.html',
    styles: [`
    .ng-valid[required], .ng-valid.required {
      border-color: #42A948; / green /
    }
    .ng-invalid:not(form) {
      border-color: #a94442; / red /
    }
    `],
})


export class DepartmentViewComponent implements OnInit {


    company: Result;
    branch: Result;
    val: boolean=false;
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    private companyId = JSON.parse(localStorage.getItem('Company_ID'));
    private params;
    checkedBox:boolean = false;
    departments: DepartmentViewResponse[];    
    private headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('Authorization', this.temp.token);

    errorMsg: string;
    successMsg: string;
    selectedDepartment;
    department: DepartmentModel;
    isSave = true;

    constructor(
        private http: HttpClient,
        private router: Router,
        private departmentService: DepartmentService,
        private uiService: UIService
    ) {
        this.department = new DepartmentModel();
    }

    ngOnInit(): void {
        this.getDepartmentsAgianstCommpanyID();
        
        // if (this.temp.Role != 18) {
        //     this.getDepartmentsAgianstCommpanyID();
        // }
        // else {
        //     this.getAllDepartments();
        // }
    }

    newDepartment(){
        this.department = new DepartmentModel();
    }

    getDepartmentsAgianstCommpanyID() {

        //console.log("getting specific departments start");

        this.departmentService.getDepartmentsAgainstCompanyID(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                //yahan respose ka modle use kena
                this.departments = data.Result;
                // console.log(this.departments);
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }
    checkDepartmentAlReady(id) {
        for(let i = 0; i < this.departments.length; i++ ) {
            if (this.departments[i].id != id) {
                let d1 = this.departments[i].Department_Name.toUpperCase();
                let d2 = this.department.Department_Name.toUpperCase();
                if(d1 === d2) {
                    return false;
                }
            }      
        }
        return true;
    }

    addDepartment() {
        this.department.CompanyID = this.companyId;
        this.isSave = true;
        // alert(this.department.Department_Name);
        if (!this.checkDepartmentAlReady(-1)) {
            this.uiService.alertError('This Department name already in use, Please use another name');
            this.department.Department_Name = '';
            this.isSave = false;
            return;
        }
        this.departmentService.addDepartment(this.department).subscribe(data => {
            if (data.statusCode == "1") {
                this.isSave = true;
                this.uiService.alertSuccess("Department Added Successfuly");
                this.getDepartmentsAgianstCommpanyID();                
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        },
            err => {
                this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
            });
    }

    editDepartment() {
        this.isSave = true;
        if (!this.checkDepartmentAlReady(this.department.id)) {
            this.uiService.alertError('This Department name already in use, Please use another name');
            this.department.Department_Name = '';
            this.isSave = false;
            return;
        }

        this.departmentService.editDepartment(this.department).subscribe(data => {
            if (data.statusCode == "0") {
                this.uiService.alertSuccess("Department Updated Successfuly");
                this.isSave = true;
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        },
            // error callback
            err => {
                this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
            });
    }

    deleteDepartments() {
        this.selectedDepartment = this.departments.filter(_ => _.selected);
        //console.log("selected department:"+ JSON.stringify(this.selectedDepartment));
        for (var department in this.selectedDepartment) {
            this.departmentService.deleteDepartment(this.selectedDepartment[department].id).subscribe(data => {
                if (data.statusCode == "1") {
                    this.uiService.alertSuccess("Department Deleted Successfuly");
                    this.getDepartmentsAgianstCommpanyID();        
                    this.initTable();
                }
                else {
                    this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
                }
            },
                // error callback
                err => {
                    this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
                });
        }
    }

    getAllDepartments() {
       // console.log("get all departments start");

        this.departmentService.getAllDepartments().subscribe(data => {
            if (data.statusCode == "1") {
                //yahan respose ka modle use kena
                this.departments = data.Result;
                // console.log("departmments",JSON.stringify(this.departments));
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
            },
            () => {

            }
        );
    }

    initTable() {
        $("#tblDepartmentData").DataTable();
    }

    changeDepartment(department: DepartmentModel) {
        this.department = department;
        this.val=true;
    }

    checkAll(){
        this.checkedBox = !this.checkedBox;
    }
}

