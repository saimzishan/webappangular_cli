import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../models/employee.model';
import { PediturkApi } from '../../../pediturk-api';
import { EmployeeService } from '../services/employee.service';
import { UIService } from '../../shared/services/ui.service';

declare var $: any;
@Component({
    selector: 'employee',
    templateUrl: '../templates/employee.component.html'
})


export class EmployeeComponent implements AfterViewInit {
    private temp;
    employee: EmployeeModel;
    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/json');

    constructor(private http: HttpClient, private router: Router, private employeeService: EmployeeService, private uiService: UIService) {
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.employee = new EmployeeModel();
    }

    ngAfterViewInit(): void {
        this.getAllEmployees();
    }
    errorMsg: string;
    successMsg: string;
    tmp: number;
    employees;

   /* addEmployee() {
        //signup call
        this.employeeService.signUp(this.employee).subscribe(data => {
            console.log("Signup sucess " + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") { //signup status code
                this.uiService.alertSuccess("Sigunup side user Successfuly");
                this.employee.User_ID = data.Result.id;
                console.log("user id" + this.employee.User_ID);

                //add employee call if signup wass a success
                this.employeeService.addEmployee(this.employee).subscribe(data => {
                    // Read the result field from thae JSON response.
                    console.log("post success" + data.statusMessage + data.statusCode);
                    if (data.statusCode == "1") {

                        this.uiService.alertSuccess("Eployee  Successfuly");
                        console.log("DOCUMENT " + this.employee.tempCertificate);
                        if (this.employee.tempCertificate != undefined)
                            if (this.employee.tempCertificate.length > 10)
                                this.uploadCertificate(data.Result.id.toString());

                        this.uiService.alertSuccess("Employee Added Successfuly");
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
            }//if
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

    }*/

    getAllEmployees() {
        // console.log("get all Employee start");

        this.employeeService.getAllEmployees().subscribe(data => {
            //     console.log("get all companies success" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {

                this.employees = data.Result;

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

    initTable() {
        $("#tblEmployeeData").DataTable();
    }


    deleteEmployee(id: string) {

        this.errorMsg = "";
        this.successMsg = "";

        this.employeeService.deleteEmployee(id).subscribe(data => {
            console.log("delete by id" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Employee Deleted Successfuly");

                this.employees = this.employees.filter(h => h.id !== Number.parseInt(id));
                this.initTable();
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            // error callback
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }


    editEmployee() {

        this.errorMsg = "";
        this.successMsg = "";
        this.employeeService.editEmployee(this.employee, 234, 765).subscribe(data => {
            if (data.statusCode == "1") {

                this.uiService.alertSuccess("Employee Updated Successfuly");

            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            // error callback
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }



    uploadCertificate(empid: string) {
        console.log("upload certificate  : idemp : " + empid);
        this.successMsg = "Uploading certificate...";

        this.headers = new HttpHeaders().set('Authorization', this.temp.token);

        this.params = new HttpParams().set('content_type', "." + this.employee.ext)
            .set('certificate_type', this.employee.ext)
            .set('employ_ID', empid)
            .set('userID', this.temp.id)
            .set('Certificate_Name', this.employee.Certificate_Name + "");


        this.http.post<AddCertificateResponse>(PediturkApi.uploadCertificate, this.employee.tempCertificate, { headers: this.headers, params: this.params }).subscribe(data => {
            // Read the result field from the JSON response.
            console.log("post success" + data.statusMessage + data.statusCode + this.temp.id);
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("certificate Uploaded Successfuly");
                // this.successMsg = "thumbnail Uploaded Successfuly";
            }
            else {
                this.uiService.alertSuccess("Sorry, certificate Couldn't Be Uploaded");
                //   this.errorMsg = "Sorry, thumbnail Couldn't Be Uploaded";
            }
        },
            // error callback
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

}

export interface AddCertificateResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
}
