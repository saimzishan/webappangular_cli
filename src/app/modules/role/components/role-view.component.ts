import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { RoleModel } from '../models/role.model';
import { RoleService } from '../services/role.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';
import { RoleViewResponse } from '../models/role-view-response.model';
declare var $: any;

@Component({
    selector: 'role-view',
    templateUrl: '../templates/role-view.component.html'
})


export class RoleViewComponent implements OnInit {
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json')
        .set('Authorization', this.temp.token);

    errorMsg: string;
    successMsg: string;
    role: RoleModel
    constructor(private http: HttpClient, private router: Router, private roleService: RoleService, private uiService: UIService) {
        this.role = new RoleModel();
    }
    ngOnInit(): void {
        this.getAllRoles();
    }

    roles: RoleViewResponse[];


    getAllRoles() {
        console.log("get all companies start");

        this.roleService.getAllRoles().subscribe(data => {
            //     console.log("get all companies success" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                //yahan respose ka modle use kena
                 this.roles = data.Result;
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
        $("#tblCompanyData").DataTable();
    }
    deleteRoles(id: string) {

        this.errorMsg = "";
        this.successMsg = "";

        this.roleService.deleteRole(id).subscribe(data => {
            console.log("delete by id" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Role Deleted Successfuly");

                this.roles = this.roles.filter(h => h.id !== Number.parseInt(id));
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

    tmp :number; 
    addRole()
    {
     //  throw new Error('Im errorn');
      console.log("add role req start"+ this.tmp);
       
       this.roleService.addRole(this.role).subscribe(data => {
           // Read the result field from the JSON response.
           console.log("post success"+ data.statusMessage + data.statusCode);
           if(data.statusCode == "1"){ 
                  this.uiService.alertSuccess("Role Added Successfuly");
              }
           else{
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

    editRole() {

        this.errorMsg = "";
        this.successMsg = "";
        this.roleService.editRole(this.role).subscribe(data => {
            if (data.statusCode == "0") {

                this.uiService.alertSuccess("Role Updated Successfuly");

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



    changeRole(pro: RoleModel) {
        this.role = pro;
    }

}
export interface Result {
    id: number;
    Company_Name: string;
    created_at: string;
    updated_at: string;
    URL: string;
    Logo: string;
    Address: string;
    ContactNumber: number;
}
