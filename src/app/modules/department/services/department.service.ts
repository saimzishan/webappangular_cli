import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { DepartmentModel, BranchDepartmentModel } from '../models/department.model';

import { DepartmentViewResponse, BranchDepartmentResponse } from '../models/department-view-response.model';
@Injectable()
export class DepartmentService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;

    constructor(private http: HttpClient) {
     //   this.headers = new HttpHeaders();

        this.temp = JSON.parse(localStorage.getItem('currentUser'));
    //    this.headers.append('content-type', 'application/json');
    }

    addDepartment(departmentModel: DepartmentModel): Observable<AddRoleResponse> {

        console.log(this.temp.token+"data:"+JSON.stringify(departmentModel) );
        return this.http.post(PediturkApi.addDepartment,JSON.stringify(departmentModel),{ headers: this.headers, params: this.params })
                        .map(res => <AddRoleResponse> res ) ;
    }

    editDepartment(departmentModel: DepartmentModel): Observable<AddRoleResponse> {
      //  console.log(this.temp.token+"data:"+JSON.stringify(companyModel) );
        this.headers = new HttpHeaders()
        .set('Authorization', this.temp.token); 

        this.params = new HttpParams()
        .set('userID', this.temp.id)
        .set('Department_Name', departmentModel.Department_Name);

    //id chek ker lena
        return this.http.put(PediturkApi.updateDepartment+departmentModel.id,"", { headers: this.headers, params: this.params })
                        .map(res => <AddRoleResponse> res);
    }
    
    getAllDepartments(): Observable<ViewResponse> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token); 
        //
        return this.http.get(PediturkApi.getAllDepartment, { headers: this.headers })
                        .map(res => <ViewResponse> res);
    }

    deleteDepartment(objID): Observable<ViewResponse> {
        this.headers = new HttpHeaders();
       this.headers.set('Authorization', this.temp.token); 
        
        return this.http.delete(PediturkApi.getOrDeleteByIdDepartment+objID, { headers: this.headers })
                        .map(res => <ViewResponse> res ) ;
    }

    getDepartmentsAgainstCompanyID(objID): Observable<ViewResponse> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        this.params = new HttpParams().set('company_ID',objID);
        return this.http.get(PediturkApi.getAllDepartmentsAgainstCompanyID, { headers: this.headers,params: this.params  })
          .map(res => <ViewResponse>res);
    }
    getDepartmentOfBranchByID(objID): Observable<AllBranchesOfDepartmentResponse> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        this.params = new HttpParams().set('BranchID',objID);
        return this.http.get(PediturkApi.getBranchDepartments_Against_Branch_ID, { headers: this.headers,params: this.params  })
          .map(res => <AllBranchesOfDepartmentResponse>res);
    }

    //Calles of Departments to Branch
    getDepartmentOfBranch(): Observable<AllBranchesOfDepartmentResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams();
        return this.http.get(PediturkApi.getAllDepartmentOfBranchURL, { headers: this.headers,params: this.params  })
          .map(res => <AllBranchesOfDepartmentResponse>res);
    }

    createDepartmentToBranch(branchDepartment: BranchDepartmentModel): Observable<AddDepartmentBranchResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams();
        // console.log("branchDepartment data:"+JSON.stringify(branchDepartment));
        return this.http.post(PediturkApi.addDepartmentToBranchURL, JSON.stringify(branchDepartment), { headers: this.headers, params: this.params })
                        .map(res => <AddDepartmentBranchResponse> res ) ;
    }
}



export interface AddRoleResult {
    Name: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface AddRoleResponse {
    statusCode: string;
    statusMessage: string;
    Result: AddRoleResult;
}

export interface AddDepartmentBranchResponse {
    statusCode: string;
    statusMessage: string;
    Result: BranchDepartmentResponse;
}

export interface Result {
    id: number;
    Department_Name: string;
    BranchID: number;
    CompanyID: number;
    created_at: string;
    updated_at: string;
}

export interface ViewResponse {
    statusCode: string;
    statusMessage: string;
    Result: DepartmentViewResponse[];
}
export interface AllBranchesOfDepartmentResponse {
    statusCode: string;
    statusMessage: string;
    Result: BranchDepartmentResponse[];
}
export interface DeleteResponse {
    statusCode: string;
    statusMessage: string;
    Result?: any;
}