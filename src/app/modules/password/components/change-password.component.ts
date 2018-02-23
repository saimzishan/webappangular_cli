import { Component } from '@angular/core';  
import { Router }    from '@angular/router'; 
//import { FormsModule,NgModel } from '@angular/forms';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { PediturkApi } from '../../../pediturk-api' ;


import { PasswordService } from '../services/password.service'
import { ChangePasswordModel } from "../models/changepassword.model";

 
@Component({
 selector: 'change-password', 
 templateUrl: '../templates/change-password.component.html'
})

export class ChangePasswordComponent  {

    private temp = JSON.parse(localStorage.getItem('currentUser'));
    
   private params;
   private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json')
                                      .set('Authorization', this.temp.token); 

   errorMsg: string;
   successMsg: string;
   changePasswordModel:ChangePasswordModel

   constructor(private http: HttpClient,private passwordService:PasswordService) { 
    this.changePasswordModel = new ChangePasswordModel();
   }

   changePass(){
    
            this.errorMsg = ""; 
            this.successMsg = ""; 

            if(this.changePasswordModel.newPass == this.changePasswordModel.rePass)
            {
                if(this.changePasswordModel.oldPass == this.temp.Password)
                {
                        this.params = new HttpParams().set('Password', this.changePasswordModel.newPass); 
console.log("passwordmodelvalue"+JSON.stringify(this.changePasswordModel));
                        this.passwordService.changePassword(this.changePasswordModel).subscribe(data => {
                            
                      //  this.http.put<PasswordResponse>(PediturkApi.changePassword+this.temp.id,"",{ headers: this.headers, params: this.params }).subscribe(data => {

                            // Read the result field from the JSON response.
                            console.log("change pass" + data.statusMessage + data.statusCode);
                            if (data.statusCode == "1") {
                                this.successMsg = "Password Updated Successfuly"; 
                            }
                            else {
                                this.errorMsg = "Sorry, Password Couldn't Be Updated. Try again later."; 
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
                else
                { 
                    this.errorMsg = "Old password doesn't match"; 
                }
            }
            else{
                 this.errorMsg = "New password doesn't match"; 
            }
    } 

}