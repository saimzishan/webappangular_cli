import { PediturkApi } from '../../../pediturk-api'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { ChangePasswordModel } from '../models/changepassword.model';
import { ForgetPasswordModel } from '../models/forgetpassword.model';
import { ForgetPassEmailModel } from "../models/forgetpassemail.model"; 

@Injectable()
export class PasswordService {
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin','*')
    .set('Content-Type' ,'application/json'); 
  //  headers: HttpHeaders;
    params: HttpParams;
    private temp;
    constructor(private http: HttpClient) {
        this.temp = JSON.parse(localStorage.getItem('currentUser'));      
    //    this.headers = new HttpHeaders();
   //     this.headers.set('content-type', 'application/json').set('Authorization',this.temp.token);
         }

    changePassword(changePasswordModel: ChangePasswordModel): Observable<ChangePasswordResponse> {

        this.params = new HttpParams().set('Password', changePasswordModel.newPass);
        //console.log("token" +this.temp.token);
        this.headers=new HttpHeaders().set('Authorization',this.temp.token);
        return this.http.put(PediturkApi.changePassword + this.temp.id, "", { headers: this.headers, params: this.params })
            .map(res => <ChangePasswordResponse>res);
    }

    forgetPassword(forgetPasswordModel: ForgetPasswordModel): Observable<ForgetPasswordResponse> {
        this.params = new HttpParams().set('Password', forgetPasswordModel.rePass)
      //  console.log("token" +this.temp.token);  
        this.headers=new HttpHeaders().set('Authorization',forgetPasswordModel.token);
        return this.http.put(PediturkApi.changePassword + forgetPasswordModel.userId, "", { headers: this.headers, params: this.params })
            .map(res => <ForgetPasswordResponse>res);
    }

    forgetEmailPassword(forgetPassEmailModel: ForgetPassEmailModel): Observable<ForgetPassEmailResponse> {
        this.params = new HttpParams().set('Email', forgetPassEmailModel.txtEmail)
   
       // this.headers=new HttpHeaders().set('Authorization',this.temp.token);
        
        return this.http.post(PediturkApi.forgotPassword, "", { headers: this.headers, params: this.params })
            .map(res => <ForgetPassEmailResponse>res);
    }

}

export interface ChangePasswordResponse {
    statusCode: string;
    statusMessage: string;
    Result?:any;
}


export interface ForgetPasswordResponse {
    statusCode: string;
    statusMessage: string;
    Result: ForgetPasswordResult;
}

export interface ForgetPasswordResult {
    id: number;
    Email: string;
}

export interface ForgetPassEmailResponse {
    statusCode: string;
    statusMessage: string;
    Result: ForgetPassEmailResult;
  }
  
  export interface  ForgetPassEmailResult {
    id: number;
    Email: string;
  }