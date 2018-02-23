import { Component, OnInit } from '@angular/core';  
import { Router,ActivatedRoute,Params }    from '@angular/router'; 
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { PediturkApi } from '../../../pediturk-api'

import { PasswordService } from '../services/password.service'
import { ForgetPasswordModel } from "../models/forgetpassword.model";

 
@Component({
 selector: 'forgot-password', 
 templateUrl: '../templates/forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
   forgetPasswordModel:ForgetPasswordModel

  constructor(private http: HttpClient, private router: Router,private activatedRoute: ActivatedRoute, private passwordService: PasswordService) { 
    this.forgetPasswordModel = new ForgetPasswordModel();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
       let dt = params['token']; 
       console.log(dt);
       this.prm = dt.split("+");
    });

  }

  tkn:string;
  prm;

  private params;
  private headers; 

  errorMsg: string;
  successMsg: string;

  changePass(){

   
    
            this.errorMsg = ""; 
            this.successMsg = ""; 

            if(this.forgetPasswordModel.newPass == this.forgetPasswordModel.rePass)
            {
                this.forgetPasswordModel.userId =  this.prm[1];
                this.forgetPasswordModel.token =  this.prm[0];

                 this.params = new HttpParams().set('Password', this.forgetPasswordModel.newPass); 
                 this.passwordService.forgetPassword(this.forgetPasswordModel).subscribe(data => {
                       // this.http.put<PasswordResponse>(PediturkApi.changePassword+this.prm[1],"",{ headers: this.headers, params: this.params }).subscribe(data => {
                            // Read the result field from the JSON response.
                            console.log("change pass" + data.statusMessage + data.statusCode);
                            if (data.statusCode == "1") {
                                this.successMsg = "Password Changed Successfuly"; 
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
            else{
                 this.errorMsg = "New password doesn't match"; 
            }
    } 

}

export interface PasswordResponse {
  statusCode: string;
  statusMessage: string;
  Result?: any;
}