import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import {appoinmentRoutedComponents} from '../appoinment.routing';

@Injectable()
export class AppoinmentService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;
  private Company_ID: string | null;

    constructor(private http: HttpClient) {
        // this.headers = new HttpHeaders();
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.Company_ID = localStorage.getItem('Company_ID');
      // this.headers.append('content-type', 'application/json');
    }
    getAllCustomer(): Observable<any> {
      this.headers = new HttpHeaders();
      this.headers.set('Authorization', this.temp.token);
      return this.http.get(PediturkApi.getAllCustomers, { headers: this.headers })
          .map(res => <any>res);
  }
  getAllSpecialist(): Observable<any> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    return this.http.get(PediturkApi.getAllSpecialist, { headers: this.headers })
        .map(res => <any>res);
  }
  getEmployesServices_Against_Emp_ID(id): Observable<any> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    this.params = new HttpParams()
      .set('employID', id);
    return this.http.get(PediturkApi.getEmployesServices_Against_Emp_ID, { headers: this.headers, params: this.params })
        .map(res => <any>res);
  }
  getAllAppiontment(): Observable<any> {
    this.headers = new HttpHeaders();
    this.headers.set('Authorization', this.temp.token);
    return this.http.get(PediturkApi.getAllAppiontment, { headers: this.headers})
      .map(res => <any>res);
  }
  submitAppiontment(employeeModel): Observable<any> {
    // console.log(employeeModel);
    this.params = new HttpParams()
      .set('Doctor_ID', employeeModel.docID)
      .set('Date', employeeModel.date)
      .set('Start_Time', employeeModel.servicesFrom)
      .set('End_Time', employeeModel.serviceTo)
      .set('Customer_ID', employeeModel.customerID)
      .set('Notification_Status', employeeModel.notification)
      .set('Remarks', employeeModel.internalNote)
      .set('status', employeeModel.userStatus)
      .set('serviceID', employeeModel.serviceID);
    // console.log(this.params);
    return this.http.post(PediturkApi.submitAppiontment, '', { headers: this.headers, params: this.params })
      .map(res => <any>res);
  }
}
