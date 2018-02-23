import { Component } from '@angular/core';  
import { Router }    from '@angular/router'; 
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { RoleModel }  from '../models/role.model';
import { PediturkApi } from '../../../pediturk-api'
import {RoleService } from '../services/role.service';
import { UIService } from '../../shared/services/ui.service';


@Component({
    selector: 'role', 
    templateUrl: '../templates/role.component.html'
   })

   
export class RoleComponent {
    role: RoleModel; 
    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin','*')
                                       .set('Content-Type' ,'application/json'); 
  
    constructor(private http: HttpClient, private router: Router, private roleService: RoleService,private uiService: UIService) { 
      this.role = new RoleModel(); 
    }

    errorMsg: string;
    successMsg: string;

    addRole()
    {
     //  throw new Error('Im errorn');
    //   console.log("addcomp req start"+ this.tmp);
       
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


}