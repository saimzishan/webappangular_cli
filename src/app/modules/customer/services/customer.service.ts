import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { CustomerModel } from '../models/customer.model';

@Injectable()
export class CustomerService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;
    private empDetials: any | null;
    private Company_ID: string | null;

    constructor(private http: HttpClient) {
        //this.headers = new HttpHeaders();
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.Company_ID = localStorage.getItem('Company_ID');
        //this.headers.append('content-type', 'application/json');
    }
    addCustomer(newCustomer): Observable<any> {
        console.log(newCustomer);
        this.headers = new HttpHeaders();
        this.params = new HttpParams()
            .set('First_Name', newCustomer.customCustomerName)
            .set('userID', newCustomer.userID)
            .set('companyID', newCustomer.userID)
            .set('BranchID', newCustomer.userID)
            .set('customCustomerBrith', newCustomer.customCustomerBrith)
            .set('customCustomerEmail', newCustomer.customCustomerEmail)
            .set('customCustomerPhone', newCustomer.customCustomerPhone)
            .set('National_ID', newCustomer.National_ID)
            .set('Sex', newCustomer.Sex)
            .set('notes', newCustomer.notes)
        return this.http.post(PediturkApi.createNewCustomer,'', { headers: this.headers, params: this.params })
            .map(res => <any>res);
    }
    getAllCustomer(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.getAllCustomers, { headers: this.headers })
            .map(res => <any>res);
    } 
    getSingleCustomerDetails(customerID): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.getSingleCustomerDetails + customerID, { headers: this.headers })
            .map(res => <any>res);
    }
    getUserByID(userID): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.getUserByID + userID, { headers: this.headers })
            .map(res => <any>res);
    } 
    getAllSpecialist(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.getAllSpecialist, { headers: this.headers })
            .map(res => <any>res);
    }
    showAllUsers(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.showAllUsers, { headers: this.headers })
            .map(res => <any>res);
    }
    
}