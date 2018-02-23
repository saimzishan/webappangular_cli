import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { PediturkApi } from '../../../pediturk-api'
import { CompanyModel } from '../models/company.model';

@Injectable()
export class CompanyService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;

    constructor(private http: HttpClient) {
     //   this.headers = new HttpHeaders();

        this.temp = JSON.parse(localStorage.getItem('currentUser'));
    //    this.headers.append('content-type', 'application/json');
    }

    addCompnay(companyModel: CompanyModel): Observable<AddCompanyResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('Company_Name', companyModel.Company_Name)
                                      .set('Company_Type',"1")
                                      .set('Max_Allowed_Branches', companyModel.Max_Allowed_Branches+"")
                                      .set('SubscriptionID', companyModel.SubscriptionID+"")
                                      .set('Status', companyModel.Status+"")
                                      .set('Country', companyModel.Country+"")
                                      .set('City', companyModel.City+"")
                                      .set('Town', companyModel.Town+"")
                                      .set('Street', companyModel.Street+"")
                                      .set('Building_No', companyModel.Building_No+"")
                                      .set('Mobile_No', companyModel.Mobile_No+"")
                                      .set('Landline_No', companyModel.Landline_No+"")
                                      .set('Location', companyModel.Location+"")
                                      .set('Contact_Person', companyModel.Contact_Person+"")
                                      .set('Contact_Person_Email', companyModel.Contact_Person_Email+"")
                                      .set('Email', companyModel.Company_Admin_Email+"")
                                      .set('Branch_Admin_Email', companyModel.Branch_Admin_Email+"")
                                      .set('Password', companyModel.Admin_Password+"")
                                      .set('Role',"2")

                                      .set('URL', companyModel.URL)
                                      .set('Address', companyModel.Address)
                                      .set('ContactNumber', companyModel.ContactNumber+"")  
                                      .set('Software_Services_Level', companyModel.Software_Services_Level+"")
                                      .set('Company_Website', companyModel.Company_Website+"")
                                      .set('Logo', ""); 
                                      //.set('Social_Media_ID', companyModel.Social_Media_ID+"")
                                     console.log(companyModel.SocialMediaLinks);
                                      return this.http.post(PediturkApi.addCompany, JSON.stringify(companyModel.SocialMediaLinks), { headers: this.headers, params: this.params })
                        .map(res => <AddCompanyResponse> res ) ;
    }


    editCompany(companyModel: CompanyModel): Observable<EditCompanyResponse> {
        //console.log(this.temp.token+"data:"+JSON.stringify(companyModel) );
        this.headers = new HttpHeaders().set('Authorization', this.temp.token); 

        this.params = new HttpParams()
        .set('userID',this.temp.id +"")
        .set('Company_Name', companyModel.Company_Name)
        .set('Company_Type',"1")
        .set('Max_Allowed_Branches', companyModel.Max_Allowed_Branches+"")
        .set('SubscriptionID', companyModel.SubscriptionID+"")
        .set('Status', companyModel.Status+"")
        .set('Country', companyModel.Country+"")
        .set('City', companyModel.City+"")
        .set('Town', companyModel.Town+"")
        .set('Street', companyModel.Street+"")
        .set('Building_No', companyModel.Building_No+"")
        .set('Mobile_No', companyModel.Mobile_No+"")
        .set('Landline_No', companyModel.Landline_No+"")
        .set('Location', companyModel.Location+"")
        .set('Contact_Person', companyModel.Contact_Person+"")
        .set('Contact_Person_Email', companyModel.Contact_Person_Email+"")

        .set('URL', companyModel.URL)
        .set('Address', companyModel.Address)
        .set('ContactNumber', companyModel.ContactNumber+"")  
        .set('Software_Services_Level', companyModel.Software_Services_Level+"")
        .set('Company_Website', companyModel.Company_Website+"")
        .set('Logo', " "); 
        

        //console.log("parms edit: "+PediturkApi.updateCompany+companyModel.id+this.params);
        //console.log(" Update Links:: "+JSON.stringify(companyModel.SocialMediaLinks));

    
        return this.http.put(PediturkApi.updateCompany+companyModel.id, JSON.stringify(companyModel.SocialMediaLinks), { headers: this.headers, params: this.params })
                        .map(res => <EditCompanyResponse> res);
    }
    
    getCompanies(): Observable<CompaniesResponse> {
        this.headers = new HttpHeaders();
     //   this.headers.set('Authorization', this.temp.token); 
        // console.log("urls "+PediturkApi.getAllCompanies);
        return this.http.get(PediturkApi.getAllCompanies, { headers: this.headers })
                        .map(res => <CompaniesResponse> res);
    }

    deleteCompany(objID): Observable<CompaniesResponse> {
        this.headers = new HttpHeaders();
       // this.headers.set('Authorization', this.temp.token); 
        return this.http.delete(PediturkApi.getOrDeleteByIdCompany+objID, { headers: this.headers })
                        .map(res => <CompaniesResponse> res ) ;
    }


    getCompanyAgainstCompanyID(objID): Observable<CompaniesResponse> {
        this.headers = new HttpHeaders();
        //this.headers.set('Authorization', this.temp.token);
    //    this.params = new HttpParams().set('company_ID',objID);
        return this.http.get(PediturkApi.getOrDeleteByIdCompany+objID, { headers: this.headers })
          .map(res => <CompaniesResponse>res);
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
    Company_Type: string;
    SubscriptionID: string;
    Software_Services_Level: string;
    Main_Branch: string;
    Max_Allowed_Branches: string;
    Status: string;
    Country: string;
    City: string;
    Town: string;
    Street: string;
    Building_No: string;
    Mobile_No: string;
    Landline_No: string;
    Location: string;
    Contact_Person_Email: string;
    Contact_Person: string;
    Company_Website: string;
    userID: number;
    updated_at: string;
    created_at: string;
    id: number;
  }

  
  export interface AddLogoResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
  }

  export interface CompaniesResponse {
    statusCode: string;
    statusMessage: string;
    Result: CompanyMediaResult[];
}
export interface SingleCompaniesResponse {
    statusCode: string;
    statusMessage: string;
    Result: CompanyModel;
}
export interface SocialMediaData {
    id: string;
    companyID: string;
    URL: string;
    created_at: string;
    updated_at: string;
}
export interface CompanyMediaResult {
    companyData: CompanyModel;
    SocialMediaData: SocialMediaData[];
}

export interface EditCompanyResponse {
    statusCode: string;
    statusMessage: string;
    Result: CompanyModel;
}
export class UserModel {
    id: number;
    Email: string;
    password: string;
    token: string;
}

export interface UserCreateResponse {
    statusCode: string;
    statusMessage: string;
    Result: UserModel;
}
