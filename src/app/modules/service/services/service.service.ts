import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { ServiceModel } from '../models/service.model';
import { CategoryModel } from '../models/service-category.model';

@Injectable()
export class ServiceService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;

    constructor(private http: HttpClient) {
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
    }

    createCategory(serviceCategoryModel: CategoryModel): Observable<CategoryResponseObject>{
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.params = new HttpParams();
        return this.http.post(PediturkApi.addServiceCategory,JSON.stringify(serviceCategoryModel),{ headers: this.headers, params: this.params })
        .map(res => <CategoryResponseObject> res ) ;
    }
    
    updateCategory(serviceCategoryModel: CategoryModel): Observable<CategoryResponseObject>{
        this.headers = new HttpHeaders().set('content-type', 'application/json');
        this.params = new HttpParams();
        return this.http.put(PediturkApi.updateServiceCategory+serviceCategoryModel.id,JSON.stringify(serviceCategoryModel),{ headers: this.headers, params: this.params })
        .map(res => <CategoryResponseObject> res ) ;
    }

    deleteCategory(id: number): Observable<CategoryResponseObject>{
        this.headers = new HttpHeaders().set('Authorization', this.temp.token); 
        return this.http.delete(PediturkApi.deleteServiceCategory+id, { headers: this.headers })
        .map(res => <CategoryResponseObject> res ) ;
    }

    readCategoryList(): Observable<ServiceCategoryListResponse>{
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token); 
        return this.http.get(PediturkApi.getServiceCategories, { headers: this.headers })
        .map(res => <ServiceCategoryListResponse> res);
    }

    readCategoriesOfCompany(companyId: any): Observable<ServiceCategoryListResponse>{
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('Company_ID',companyId.toString());        
        this.headers.set('Authorization', this.temp.token); 
        return this.http.get(PediturkApi.getServiceCategoriesOfCompany, { headers: this.headers, params: this.params })
        .map(res => <ServiceCategoryListResponse> res);
    }

    /*Service CRUD*/

    addService(serviceModel: ServiceModel): Observable<AddServiceResponse>{
        // console.log(this.temp.token+"data:"+JSON.stringify(serviceModel) );
        return this.http.post(PediturkApi.addService,JSON.stringify(serviceModel),{ headers: this.headers, params: this.params })
                        .map(res => <AddServiceResponse> res ) ;
    }

    editService(serviceModel: ServiceModel){
         this.headers = new HttpHeaders().set('content-type', 'application/json'); 
         //this.params = new HttpParams().set('id',serviceModel.Service_ID.toString());
         //serviceModel.Thumbnail="";
  
        return this.http.put(PediturkApi.updateService+serviceModel.id,JSON.stringify(serviceModel), { headers: this.headers, params: this.params })
                        .map(res => <AddServiceResponse> res);
    }

    deleteService(objID): Observable<ViewResponse>{
        this.headers = new HttpHeaders();
       this.headers.set('Authorization', this.temp.token); 
        
        return this.http.delete(PediturkApi.getOrDeleteByIdService+objID, { headers: this.headers })
                        .map(res => <ViewResponse> res ) ;
    }

    getServicesOfCompany(companyId: any): Observable<ViewResponse>{
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('Company_ID',companyId.toString());                
        this.headers.set('Authorization', this.temp.token); 
        // console.log("service URL:"+PediturkApi.getAllServicesAgainstCompanyID);
        return this.http.get(PediturkApi.getAllServicesAgainstCompanyID, { headers: this.headers, params: this.params })
                        .map(res => <ViewResponse> res);
    }
    getServicesOfCompanyByID(service_CatID: any): Observable<ViewResponse> {
        this.headers = new HttpHeaders();
        // this.params = new HttpParams().set('service_CatID',companyId.toString());
        this.headers.set('Authorization', this.temp.token);
        // console.log("service URL:"+PediturkApi.getAllServicesAgainstCompanyID);
        return this.http.get(PediturkApi.getByIdService + service_CatID, { headers: this.headers, params: this.params })
                        .map(res => <ViewResponse> res);
    }
    createServiceToBranch(branchServices): Observable<any> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams();
        console.log(JSON.stringify(branchServices));
        return this.http.post(PediturkApi.createServiceToBranch, JSON.stringify(branchServices), { headers: this.headers, params: this.params })
                        .map(res => <any> res ) ;
    }
    getAllBranchAndServices(companyId: any): Observable<AllBranchesOfServiceResponse>{
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('Company_ID',companyId.toString());                
        this.headers.set('Authorization', this.temp.token); 
        // console.log("service URL:"+PediturkApi.getAllServicesAgainstCompanyID);
        return this.http.get(PediturkApi.showAllBranchAndServices, { headers: this.headers, params: this.params })
                        .map(res => <AllBranchesOfServiceResponse> res);
    }

    getAllService(): Observable<ViewResponse>{
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token); 
        //
        return this.http.get(PediturkApi.getAllServices, { headers: this.headers })
                        .map(res => <ViewResponse> res);
    }
    
    getServicesOfCategory(categoryId: number): Observable<ServiceCategoryResponse>{
        //console.debug("cat id :" + categoryId);
        this.headers = new HttpHeaders();
        //this.headers.set('Authorization', this.temp.token);
        this.params = new HttpParams().set('service_CatID', categoryId.toString());
        return this.http.get(PediturkApi.getServicesOfCategory, { headers: this.headers, params: this.params })
            .map(res => <ServiceCategoryResponse>res);
    }
    

}



export interface AddServiceResult {
    Name: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface AddServiceResponse {
    statusCode: string;
    statusMessage: string;
    Result: AddServiceResult;
}

export interface Result {
    id: number;
    isSelected: boolean;
    selected: string;
    Department_Name: string;
    BranchID: number;
    CompanyID: number;
    created_at: string;
    updated_at: string;
}

export interface ViewResponse {
    statusCode: string;
    statusMessage: string;
    Result: Result[];
}
export interface DeleteResponse {
    statusCode: string;
    statusMessage: string;
    Result?: any;
}

export interface CategoryResponse {
    Services_Category_Name: string;
    Company_ID: number;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface CategoryResponseObject {
    statusCode: string;
    statusMessage: string;
    Result: CategoryResponse;
}

export interface ServiceCategoryList {
    id: number;
    Services_Category_Name: string;
    created_at: string;
    updated_at: string;
}

export interface ServiceCategoryListResponse {
    statusCode: string;
    statusMessage: string;
    Result: ServiceCategoryList[];
}

export interface ServicesOfCategory {
    id: number;
    Company_ID: number;
    service_CatID: number;
    Service_Name: string;
    Visibility: number;
    Price: number;
    Duration: string;
    Padding_Time_Before: string;
    Padding_Time_After: string;
    Capacity: string;
    Service_Providers: number;
    Info: string;
    Color: string;
    Thumbnail: string;
    Status: number;
    Service_Commission_Type: string;
    Service_Commission_Rate: number;
    created_at: string;
    updated_at: string;
}

export interface ServiceCategoryResponse {
    statusCode: string;
    statusMessage: string;
    Result: ServicesOfCategory[];
}
export interface AllBranchesOfServiceResponse {
    statusCode: string;
    statusMessage: string;
    Result: BranchServiceResponse[];
}

export interface BranchServiceResponse {
    id: number;
    BranchID: number;
    ServiceID: number;
    service_CatID: number;
    Service_Name: string;
    alReadyUploaded: boolean;
    created_at: string;
    updated_at: string;
}

    
    