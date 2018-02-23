import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { BranchModel } from '../models/branch.model';
import { CompanyModel } from '../../company/models/company.model';
import { BranchViewResponse } from '../models/branch-view-response.model';


@Injectable()
export class BranchService {
  headers: HttpHeaders;
  params: HttpParams;
  private temp;


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();

    this.temp = JSON.parse(localStorage.getItem('currentUser'));
    this.headers.append('content-type', 'application/json');
  }
  addBranch(branchModel: BranchModel): Observable<AddCompanyResponse> {
    this.params = new HttpParams()
      .set('Name', branchModel.Name)
      .set('Country', branchModel.Country)
      .set('City', branchModel.City)
      .set('Town', branchModel.Town + "")
      .set('Street', branchModel.Street + "")

      .set('Number', branchModel.Number + "1")
      .set('Telephone', branchModel.Telephone + "")
      .set('Location', branchModel.Location + "")
      .set('Status', branchModel.Status + "")
      .set('Contact_Person', branchModel.Contact_Person + "")
      .set('Capabilities', branchModel.Capabilities + "")
      .set('Building_No', branchModel.Building_No + "")
      .set('Landline_Number', branchModel.Landline_Number + "1")
      .set('Fax_Number', branchModel.Fax_Number + "")
      .set('Branch_Email_address', branchModel.Branch_Email_address + "")
      .set('Email', branchModel.branch_Admin_Email + "")
      .set('Password', branchModel.Admin_Password + "")
      .set('Branch_Website', branchModel.Branch_Website + "")
      //.set('Branch_Social_Media_IDs', branchModel.Branch_Social_Media_IDs + "")
      .set('Branch_Data_Access_Permissions', branchModel.Branch_Data_Access_Permissions + "")

      .set('Branch_Data_Sharing_Permissions', branchModel.Branch_Data_Sharing_Permissions + "")
      .set('company_ID', localStorage.getItem('Company_ID'))
      .set('Branch_Type', '2')
      .set('Role', '4');
    // .set('Branch_Type', branchModel.Branch_Type+"");
    // console.log("Links:: "+JSON.stringify(branchModel.SocialMediaLinks));

    let array = [];
    array[0] = branchModel.SocialMediaLinks;
    array[1] = branchModel.DepartmentID;
   //  console.log(branchModel.SocialMediaLinks);
    return this.http.post(PediturkApi.addBranch, JSON.stringify(array), { headers: this.headers, params: this.params })
      .map(res => <AddCompanyResponse>res);
  }

  getBranches(): Observable<BranchesResponse> {
    this.headers = new HttpHeaders();
   // this.headers.set('Authorization', this.temp.token);
    return this.http.get(PediturkApi.getAllBranches, { headers: this.headers })
      .map(res => <BranchesResponse>res);
  }
  // getCompanies(): Observable<CompaniesResponse> {
  //   this.headers = new HttpHeaders();
  //   this.headers.set('Authorization', this.temp.token);
  //   return this.http.get(PediturkApi.getAllCompanies, { headers: this.headers })
  //     .map(res => <CompaniesResponse>res);
  // }

  deleteBranch(id: string): Observable<BranchesResponse> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    return this.http.delete(PediturkApi.getOrDeleteByIdBranch + id, { headers: this.headers })
      .map(res => <BranchesResponse>res);
  }

  editBranch(branchModel: BranchModel): Observable<EditCompanyResponse> {
    // console.log(this.temp.token + "data:" + JSON.stringify(branchModel));
    this.headers = new HttpHeaders().set('content-type','application/json').set('Authorization',this.temp.token);
    //this.headers = new HttpHeaders();
    //this.headers.set('Authorization', this.temp.token);

    this.params = new HttpParams()
      .set('userID', this.temp.id + "")
      .set('Name', branchModel.Name)
      .set('Country', branchModel.Country)
      .set('City', branchModel.City)
      .set('Town', branchModel.Town + "")
      .set('Street', branchModel.Street + "")
      .set('Number', branchModel.Number + "1")
      .set('Telephone', branchModel.Telephone + "")
      .set('Location', branchModel.Location + "")
      .set('Status', branchModel.Status + "")
      .set('Contact_Person', branchModel.Contact_Person + "")
      //.set('Manager', branchModel.Manager + "")
      .set('Capabilities', branchModel.Capabilities + "")
      .set('Building_No', branchModel.Building_No + "")
      .set('Landline_Number', branchModel.Landline_Number + "")
      .set('Fax_Number', branchModel.Fax_Number + "")
      .set('Branch_Email_address', branchModel.Branch_Email_address + "")
      .set('Branch_Website', branchModel.Branch_Website + "")
      //.set('Branch_Social_Media_IDs', branchModel.Branch_Social_Media_IDs + "")
      .set('Branch_Data_Access_Permissions', branchModel.Branch_Data_Access_Permissions + "")
      .set('Branch_Data_Sharing_Permissions', branchModel.Branch_Data_Sharing_Permissions + "")
      .set('company_ID', localStorage.getItem('Company_ID') )
     .set('Branch_Type', branchModel.Branch_Type + "");

    //console.log("Branch Update Links:: "+JSON.stringify(branchModel.SocialMediaLinks));     
    let array = [];
    array[0] = branchModel.SocialMediaLinks;
    array[1] = branchModel.DepartmentID;
    return this.http.put(PediturkApi.updateBranch + branchModel.id, JSON.stringify(array), { headers: this.headers, params: this.params })
      .map(res => <EditCompanyResponse>res);
  }

  getBranchesAgainstCompanyID(objID): Observable<BranchesResponse> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    this.params = new HttpParams().set('company_ID',objID);
    return this.http.get(PediturkApi.branchesAgainstCompanyId, { headers: this.headers, params: this.params})
      .map(res => <BranchesResponse>res);
  }
  getBranchesAgainstBranchID(objID): Observable<BranchesResponse> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    this.params = new HttpParams();
    return this.http.get(PediturkApi.getOrDeleteByIdBranch + objID, { headers: this.headers, params: this.params})
      .map(res => <BranchesResponse>res);
  }

}

export interface AddCompanyResponse {
  statusCode: string;
  statusMessage: string;
  Result: AddCompanyResult;
}

export interface AddCompanyResult {
  Company_Name: string;
  URL: string;
  Address: string;
  ContactNumber: string;
  updated_at: string;
  created_at: string;
  id: number;
}


export interface AddLogoResponse {
  statusCode: string;
  statusMessage: string;
  Result: string;
}

export interface BranchesResponse {
  statusCode: string;
  statusMessage: string;
  Result: BranchSocialMediaResponse[];
}

export interface BranchSocialMediaResponse {
  BranchData: BranchViewResponse;
  SocialMediaData: SocialMediaData[];
}

export interface SocialMediaData {
  id: string;
  branchID: string;
  Description: string;
  created_at: string;
  updated_at: string;
}

export interface EditCompanyResponse {
  statusCode: string;
  statusMessage: string;
  Result: BranchModel;
}
export interface CompaniesResponse {
  statusCode: string;
  statusMessage: string;
  Result: CompanyModel[];
}
