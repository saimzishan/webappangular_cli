import { Component, OnInit } from '@angular/core';  
import { Router }    from '@angular/router'; 
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { DepartmentModel, BranchDepartmentModel }  from '../models/department.model';
import { PediturkApi } from '../../../pediturk-api'
import { DepartmentService } from '../services/department.service';
import { UIService } from '../../shared/services/ui.service';


@Component({
    selector: 'department', 
    templateUrl:'../templates/department.component.html'
   })

   
export class DepartmentComponent implements OnInit {
    errorMsg: string;
    successMsg: string;
    tmp :number;
    companyId: any;
    branchId: any;
    departments: any[] = [];
    branchDepartments: any[] = [];
    isMovedLeft: boolean;
    isMovedRight: boolean;
    department: DepartmentModel;
    branchDeparment: BranchDepartmentModel; 
    private params;
    private headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin','*')
    .set('Content-Type' ,'application/json'); 
  
    constructor(
    private http: HttpClient,
    private router: Router,
    private departmentService: DepartmentService,
    private uiService: UIService) {
        this.department = new DepartmentModel();
        this.branchDeparment = new BranchDepartmentModel();
        this.isMovedLeft = false;
        this.isMovedRight = true;
        this.companyId = localStorage.getItem('Company_ID'); 
        this.branchId = localStorage.getItem('Branch_ID'); 
    }

    ngOnInit(){
        this.getDepartmentsAgianstCommpanyID();
        this.getDepartmentListOfBranch();
     
    }

    getDepartmentsAgianstCommpanyID() {

        this.departmentService.getDepartmentsAgainstCompanyID(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
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

    getDepartmentListOfBranch(){
        this.departmentService.getDepartmentOfBranch().subscribe(data => {
            if (data.statusCode == "1") {
                this.branchDepartments = data.Result;
               // console.log(this.branchDepartments);
                for (let row of this.branchDepartments) {
                    for (let i = 0; i < this.departments.length; i++ ) {
                        if (row.DepartmentID === this.departments[i].id) {
                            // console.log(row, this.departments[i])
                            row.Department_Name = this.departments[i].Department_Name;
                            row.alReadyUploaded = true;
                            this.departments.splice(i, 1);
                        }
                    }
                }
               // console.log(this.branchDepartments);
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            });
    }

    addDepartmentToBranch(){
        this.branchDeparment = new BranchDepartmentModel();
        this.branchDeparment.BranchID = this.branchId;        
        for(let d of this.branchDepartments){
            this.branchDeparment.DepartmentID.push(d.DepartmentID);
        }
         // console.log(this.branchDeparment);
        this.departmentService.createDepartmentToBranch(this.branchDeparment).subscribe(data => {
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Department Assigned Successfuly");
                //this.getDepartmentListOfBranch();
                this.ngOnInit();              
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        },
        err => {
            this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
        });
    }

    editDepartmentToBranch(){

    }

    removeDepartmentFromBranch(){

    }

    selectDepartment(department: any){
        department.isSelected = !department.isSelected;
    }

    selectBranchDepartment(department: any){
        department.isSelected = !department.isSelected;
    }

    pushToBranch(){
        let newMovedArr: any[] = [];
        for (let ser of this.departments){
            if(ser.isSelected == true){
                ser.isSelected = false;
                ser.DepartmentID = ser.id;
                this.branchDepartments.push(ser);
                newMovedArr.push(ser); 
            }
            if(this.isMovedLeft == true || this.isMovedRight == true && this.branchDepartments.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;
            }
        }
        console.log(this.branchDepartments);
        for (let val of newMovedArr){
            let index = this.departments.indexOf(val);
            this.departments.splice(index,1);
        }
    }

    pushBackToDepartment(){
        let arr: any[] = [];        
        for (let ser of this.branchDepartments){
            if(ser.isSelected == true){
                ser.isSelected = false;                
                this.departments.push(ser);
                arr.push(ser);                  
            }
            if(this.isMovedLeft == true  || this.isMovedRight == true && this.departments.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;                
            }           
        }
        for (let val of arr){
            let index = this.branchDepartments.indexOf(val);
            this.branchDepartments.splice(index,1);
        }
    }

    pushAllToBranch(){
        for (let ser of this.departments){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.branchDepartments.push(ser);
        }
        this.departments =[];
        this.isMovedLeft = true;
        this.isMovedRight = false;
    }

    pushAllBackToDepartment(){
        for (let ser of this.branchDepartments){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.departments.push(ser);
        }
        this.branchDepartments = [];
        this.isMovedLeft = false;
        this.isMovedRight = true;        
    }
}