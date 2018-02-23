import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CustomerModel } from '../models/customer.model';
import { PediturkApi } from '../../../pediturk-api';
import { CustomerService } from '../services/customer.service';
import { UIService } from '../../shared/services/ui.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

declare var $: any;
@Component({
    selector: 'customer',
    templateUrl: '../templates/customer.component.html',
    styles: [`
    .ng-valid[required], .ng-valid.required  {
      border-color: #42A948; /* green */
    }

    .ng-invalid:not(form)  {
      border-color: #a94442; /* red */
    }
  `],
})


export class CustomerComponent implements AfterViewInit {
    private temp;
    customer: CustomerModel;
    allCustomers: any;
    appCustomerFrom: any;
    private params;
    currentTabIndex = 0;
    Company_ID;
    Branch_ID;
    checkboxFalse = false;
    editData;
    showAllUsers;
    showDoctor;
    isSave = false;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/json');

    constructor(private customerServices: CustomerService, private uiService: UIService) {
        this.Branch_ID = localStorage.getItem('Branch_ID');
        this.Company_ID = localStorage.getItem('Company_ID');
        this.editData = new EditData();
       this.setFrom();
    }

    ngAfterViewInit(): void {
        this.getAllCustomer();
        this.getAllUsers();
        this.getDocter();
    }
    // get all customer
    getAllCustomer() {
        // console.log("getting specific companies start");
        this.customerServices.getAllCustomer().subscribe(data => {
            if (data.statusCode == "1") {
                this.allCustomers = data.Result;
                // console.log(this.allCustomers);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );

    }
    getAllUsers() {
        // console.log("getting specific companies start");
        this.customerServices.showAllUsers().subscribe(data => {
            if (data.statusCode == "1") {
                this.showAllUsers = data.Result;
                // console.log(this.showAllUsers);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );

    }
    getDocter() {
        // console.log("getting specific companies start");
        this.customerServices.getAllSpecialist().subscribe(data => {
            if (data.statusCode == "1") {
                this.showDoctor = data.Result;
                console.log(this.showDoctor);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );

    }
    testingModeON(e) {
        this.checkboxFalse = e.target.cheked;
        if (e.target.checked) {
            alert('f');
            let dd = new Date();
            let d = dd.toISOString().substring(0, 10);
            this.editData.customerName = 'Test string';
            this.editData.userID = this.showDoctor[0].id;
            this.editData.customCustomerBrith = d;
            this.editData.customCustomerEmail = 'test@test.com';
            this.editData.customCustomerPhone = 1234565678;
            this.editData.customCustomerName = 'test name';
            this.editData.National_ID = 12234545667765545;
            this.editData.Sex = 1;
            this.editData.notes = 'some test notes';
        } else {
            this.editData = new EditData();
        }
    }
    onSubmit () {
       // console.log(this.editData );
       this.isSave = false;
       this.checkEmpty();
    }
    submitIfReady() {
        this.appCustomerFrom.controls['companyID'].setValue(this.Company_ID);
        this.appCustomerFrom.controls['BranchID'].setValue(this.Branch_ID);
        this.customerServices.addCustomer(this.editData).subscribe(sucess => {
            if (sucess.statusCode === '1') {
                this.isSave = true;
                this.editData = new EditData();
            this.ngAfterViewInit();
              this.uiService.alertSuccess('Employee Added Successfuly');
            } else if (sucess.statusCode === '0') {
              this.uiService.alertError( sucess.statusMessage );
            }
          },
          resCusError => {  console.log(resCusError); },
        );
    }
    checkEmpty() {
        if (
            !this.editData.customerName ||
            !this.editData.userID ||
            !this.editData.customCustomerBrith ||
            !this.editData.customCustomerEmail ||
            !this.editData.customCustomerPhone  ||
            !this.editData.customCustomerName ||
            !this.editData.Sex
        ) { } else {
            this.submitIfReady();
        }
    }
    setFrom() {
        this.appCustomerFrom = new  FormGroup({
            Service_Required: new FormControl('', [Validators.required]),
            companyID: new FormControl('', [Validators.required]),
            BranchID: new FormControl('', [Validators.required]),
            Service_Preferences: new FormControl('', [Validators.required]),
            Reference: new FormControl('', [Validators.required]),
            Status: new FormControl('', [Validators.required]),
            Dependence: new FormControl('', [Validators.required]),
            Spouse: new FormControl('', [Validators.required]),
            Parent: new FormControl('', [Validators.required]),
            Children: new FormControl('', [Validators.required]),
            Anniversary: new FormControl('', [Validators.required]),
            Customer_Type: new FormControl('', [Validators.required]),
         } )
         this.appCustomerFrom.controls['companyID'].setValue(this.Company_ID);
         this.appCustomerFrom.controls['BranchID'].setValue(this.Branch_ID);
    }
    initTable() {
        $("#tblCompanyData").DataTable();
    }
    onUpdate(customerID) {
        this.customerServices.getSingleCustomerDetails(customerID).subscribe(data => {
            if (data.statusCode == "1") {
                let singleCustomers = data.Result;
                //console.log(this.allCustomers);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );
    }
    setNewData(singleCustomer) {

    }
    clearData() {
        this.checkboxFalse = false;
        this.editData = new EditData();
    }

}
export class EditData {
  customerName: string;
  userID;
  customCustomerBrith;
  customCustomerEmail;
  customCustomerPhone;
  customCustomerName;
  National_ID;
  Sex;
  notes;
}