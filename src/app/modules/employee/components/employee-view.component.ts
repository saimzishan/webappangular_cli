import { Component, OnInit,  } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { EmployeeModel, BranchEmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'employee-view',
    templateUrl: '../templates/employee-view.component.html'
})


export class EmployeeViewComponent implements OnInit {
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    private params;
    private headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('Authorization', this.temp.token);

    companyId: any;
    employee: EmployeeModel;
    employees: any[] = [];
    branchEmployees: any[] = [];
    isMovedLeft: boolean;
    isMovedRight: boolean;    
    branchEmployee: BranchEmployeeModel;
    branchId: any;

    constructor(private http: HttpClient, private router: Router, private employeeService: EmployeeService, private uiService: UIService) {
        this.employee = new EmployeeModel();
        this.isMovedLeft = false;
        this.isMovedRight = true;
        this.companyId = localStorage.getItem('Company_ID');
        this.branchId = localStorage.getItem('Branch_ID');
        this.branchEmployee = new BranchEmployeeModel();
    }
    
    ngOnInit(): void {
    this.getEmployeesOfCompany();
    this.getAllBranchAndEmployees();

    }

    getAllEmployees() {

        this.employeeService.getAllEmployees().subscribe(data => {
            if (data.statusCode == "1") {
                this.employees = data.Result;
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            });
    }

    getEmployeesOfCompany() {
        this.employeeService.readEmployeesOfCompany(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.employees = data.Result;
                console.log(this.employees);
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            });
    }

    selectEmployee(service: any){
        service.isSelected = !service.isSelected;
    }

    selectBranchEmployee(service: any){
        service.isSelected = !service.isSelected;
    }

    pushToBranch(){
        let arr: any[] = [];
        for (let ser of this.employees){
            if(ser.isSelected == true){
                ser.isSelected = false;
                ser.EmployeeID = ser.id;
                this.branchEmployees.push(ser);
                arr.push(ser);   
            }
            if(this.isMovedLeft == true || this.isMovedRight == true && this.branchEmployees.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;
            }
        }
        for (let val of arr){
            let index = this.employees.indexOf(val);
            this.employees.splice(index,1);
        }
        console.log(this.branchEmployees);
    }

    pushBackToEmployee(){
        let arr: any[] = [];        
        for (let ser of this.branchEmployees){
            if(ser.isSelected == true){
                ser.isSelected = false;                
                this.employees.push(ser);
                arr.push(ser);                  
            }
            if(this.isMovedLeft == true  || this.isMovedRight == true && this.employees.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;                
            }           
        }
        for (let val of arr){
            let index = this.branchEmployees.indexOf(val);
            this.branchEmployees.splice(index,1);
        }
    }

    pushAllToBranch(){
        for (let ser of this.employees){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.branchEmployees.push(ser);
        }
        this.employees =[];
        this.isMovedLeft = true;
        this.isMovedRight = false;
    }

    pushAllBackToEmployee(){
        for (let ser of this.branchEmployees){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.employees.push(ser);
        }
        this.branchEmployees = [];
        this.isMovedLeft = false;
        this.isMovedRight = true;        
    }

    addEmployeesToBranch() {
        this.branchEmployee = new BranchEmployeeModel();
        this.branchEmployee.BranchID = this.branchId;        
        for(let d of this.branchEmployees){
            this.branchEmployee.employ_ID.push(d.employ_ID);
        }
       console.log(this.branchEmployee);
        // this.serviceService.createServiceToBranch(this.branchService).subscribe(data => {
        //     if (data.statusCode == "1") {
        //         this.uiService.alertSuccess("Services Assigned Successfuly");
        //         //this.getDepartmentListOfBranch();
        //         this.ngOnInit();              
        //     }
        //     else {
        //         this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
        //     }
        // },
        // err => {
        //     this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
        // });
    }

    getAllBranchAndEmployees() {
        this.employeeService.getAllBranchAndEmployee(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.branchEmployees = data.Result;
                for (let row of this.branchEmployees) {
                    for (let i = 0; i < this.employees.length; i++ ) {
                        if (row.ServiceID === this.employees[i].id) {
                            // console.log(row, this.departments[i]) service_CatID
                            row.Employee_Name =  this.employees[i].First_Name + ' ' + this.employees[i].Last_Name;
                            row.EmployeeID = this.employees[i].id;
                            row.alReadyUploaded = true;
                            this.employees.splice(i, 1);
                            // console.log(this.branchServices[i]);
                        }
                    }
                }
                console.log(this.branchEmployees);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }
}