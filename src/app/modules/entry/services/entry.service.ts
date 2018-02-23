import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { SignupModel } from '../models/signup.model';
import { LoginModel } from '../models/login.model';
import { PediturkApi } from '../../../pediturk-api'

@Injectable()
export class EntryService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('content-type', 'application/json');
    }

    signUp(signupModel: SignupModel): Observable<SignupResponse> {

        this.params = new HttpParams().set('Email', signupModel.strEmail).set('Password', signupModel.strPassword)
                                      .set('First_Name', signupModel.strFirstName).set('Last_Name', signupModel.strLastName)
                                      .set('status', "1").set('Role', "1").set('company_ID',signupModel.Company_ID+"");

        return this.http.post(PediturkApi.signupUrl, "", { headers: this.headers, params: this.params })
                   .map(res => <SignupResponse>res);
    }
    logIn(loginModel: LoginModel): Observable<LoginResponse> {

                this.params = new HttpParams().set('Email', loginModel.strEmail).set('Password', loginModel.strPassword)
                                               .set('status', "1").set('Role', "1");

                return this.http.post(PediturkApi.signinUrl, "", { headers: this.headers, params: this.params })
                           .map(res => <LoginResponse>res);
            }
}

/* login(obj:model): Observable<>{
    return this.http.post().map(res => <LoginResponse>res);
}*/
export interface SignupResponse {
    statusCode: string;
    statusMessage: string;
    Result: SignupResult;
}

export interface SignupResult {
    id: number;
    Email: string;
}



export interface LoginResponse {
    statusCode: string;
    statusMessage: string;
    Company_Details: any[];
    BranchID: any[];
    Result: Result;
}

export interface Result {
    id: number;
    Email: string;
    token: string;
    Role: number;
    Password: string;
}
