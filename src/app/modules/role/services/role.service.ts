import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'

import { RoleViewResponse } from '../models/role-view-response.model';
import { RoleModel } from '../models/role.model';

@Injectable()
export class RoleService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;

    constructor(private http: HttpClient) {
     //   this.headers = new HttpHeaders();

        this.temp = JSON.parse(localStorage.getItem('currentUser'));
    //    this.headers.append('content-type', 'application/json');
    }

    addRole(roleModel: RoleModel): Observable<AddRoleResponse> {

        this.params = new HttpParams().set('Name', roleModel.Name);
        return this.http.post(PediturkApi.addRole,"",{ headers: this.headers, params: this.params })
                        .map(res => <AddRoleResponse> res ) ;
    }

    editRole(roleModel: RoleModel): Observable<AddRoleResponse> {
      //  console.log(this.temp.token+"data:"+JSON.stringify(companyModel) );
        this.headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', this.temp.token); 

        this.params = new HttpParams()
        .set('userID',this.temp.id +"")
        
        .set('Name',roleModel.Name +"");
 

        this.temp.id
        return this.http.put(PediturkApi.updateRole+roleModel.id,"", { headers: this.headers, params: this.params })
                        .map(res => <AddRoleResponse> res);
    }
    
    getAllRoles(): Observable<RoleResponse> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token); 
        return this.http.get(PediturkApi.getAllRoles, { headers: this.headers })
                        .map(res => <RoleResponse> res);
    }

    deleteRole(objID): Observable<AddRoleResponse> {
        this.headers = new HttpHeaders().set('content-type', 'application/json');
       // this.headers.set('Authorization', this.temp.token); 
        return this.http.delete(PediturkApi.getOrDeleteByIdDepartment+objID, { headers: this.headers })
                        .map(res => <AddRoleResponse> res ) ;
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
////////////////////////
// export interface AddCompanyResponse {
//     statusCode: string;
//     statusMessage: string;
//     Result: AddRoleResult;
//   }
  
//   export interface AddRoleResult {
//     Company_Name: string;
//     URL: string;
//     Address: string;
//     ContactNumber: string;
//     updated_at: string;
//     created_at: string;
//     id: number;
//   }

  
//   export interface AddLogoResponse {
//     statusCode: string;
//     statusMessage: string;
//     Result: string;
//   }

//   export interface RoleResponse {
//     statusCode: string;
//     statusMessage: string;
//     Result: RoleModel[];
// }

export interface RoleResponse {
    statusCode: string;
    statusMessage: string;
    Result: RoleViewResponse[];
}