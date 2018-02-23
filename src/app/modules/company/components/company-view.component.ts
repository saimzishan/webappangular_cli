import { Component, Input, OnInit, DoCheck, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { PediturkApi } from '../../../pediturk-api'
import { CompanyModel } from '../models/company.model';
import { CompanyService, CompanyMediaResult } from '../services/company.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';
import { STATUSES, COMPANYTYPES, SUBSCRIPTIONTYPES } from './partial-company.component';
import { PartialCompanyComponent } from './partial-company.component';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { single } from 'rxjs/operator/single';
// import {MatTabsModule} from '@angular/material';
declare var $: any;


@Component({
    selector: 'company-view',
    templateUrl:'../templates/company-view.component.html',
})

export class CompanyViewComponent implements OnInit, DoCheck {


    errors: Array<any>=[];
    errorMsg = false;
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    mesg = new errorMsgs();
    private params;
    checkedBox:boolean = false;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json')
        .set('Authorization', this.temp.token);

    // errorMsg: string;
    successMsg: string;
    statuses: any;
    companyTypes: any;
    subscriptionTypes: any;
    companyId: any;
    //company: CompanyModel = new CompanyModel();
    @Input()
    company: CompanyModel;
    @Input()
    isSave: boolean=false;
    isTabFill: boolean = true;
    isTab2Fill: boolean = true;    
    companyForm: FormGroup;
    firstNext: boolean = true;
    selectedCompany;
    companies;
    oneCompany;
    singlecompany: CompanyMediaResult[] = [];
    @ViewChild(PartialCompanyComponent) private partialCompany: PartialCompanyComponent;
    @ViewChild('partialCompanyForm') private partialCompanyForm: PartialCompanyComponent;

    constructor( private location: Location,  private http: HttpClient, private router: Router, private companyService: CompanyService, private uiService: UIService) {
        this.company = new CompanyModel();
        this.companyId = localStorage.getItem('Company_ID');
        this.statuses = STATUSES;
        this.companyTypes = COMPANYTYPES;
        this.subscriptionTypes = SUBSCRIPTIONTYPES;
    }

    
    ngDoCheck() {
    }



    ngOnInit(): void {
        if (this.temp.Role != 18) {
            this.getCompanyAgainstCompanyID();
        }
        else {
            this.getAllCompanies();
        }

    }

    newCompany(){
        this.company = new CompanyModel();
        this.mesg = new errorMsgs();
        this.partialCompanyForm.currentTabIndex = 0;        
    }

    tmp: number;
    getCompanyAgainstCompanyID() {
        // console.log("getting specific companies start");
        this.companyService.getCompanyAgainstCompanyID(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.singlecompany = data.Result;
                this.oneCompany = this.singlecompany[0].companyData;
                //console.log("single comapny data " + JSON.stringify(this.oneCompany));
                //console.log("single comapny data " + this.companyId);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );

    }
    checkCompNameAlReady(id) {
        for (let i = 0; i < this.companies.length; i++) {
            // console.log(this.companies[i].companyData.Company_Name);
            if (id !=  this.companies[i].companyData.id) {
                if (this.companies[i].companyData.Company_Name  === this.company.Company_Name) {
                    return false;
                }
            } 
        }
        return true;
    }
    checkEmailAlready(id) {
        for (let i = 0; i < this.companies.length; i++ ) {
            if (id !=  this.companies[i].companyData.id) {
                if( this.companies[i].companyData.Email === this.company.Company_Admin_Email ) {
                return true;
                }
            }
          // console.log(this.branches[i].BranchData);
        }
        return false;
      }
    doCheck() {
        if (!this.checkCompNameAlReady(this.company.id)) {
            this.uiService.alertError("Company with this name already in use, Please use another name..");
            this.company.Company_Name = '';
            this.company.currentTabIndex = 0;
          }
        if (this.checkEmailAlready(this.company.id)) {
            this.uiService.alertError("Company with this Admin Email already in use, Please use another Email..");
            this.company.Company_Admin_Email = '';
            this.company.currentTabIndex = 0;
          }
        this.isSave = true;
        if(this.company.Company_Name === '') {
            this.mesg.Company_Name= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Company_Name= false;
            this.isTabFill = true;
        }

         if (this.company.Company_Type==0) {
            this.mesg.Company_Type= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Company_Type= false;
            this.isTabFill = true;
        }

        if (this.company.Company_Admin_Email==='') {
            this.mesg.Company_Admin_Email= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Company_Admin_Email= false;
            this.isTabFill = true;
        }

        if (this.company.Admin_Password==='') {
            this.mesg.Admin_Password= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Admin_Password= false;
            this.isTabFill = true;
        }

        if (this.company.Max_Allowed_Branches==0) {
            this.mesg.Max_Allowed_Branches= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Max_Allowed_Branches= false;
            this.isTabFill = true;
        }

        if (this.company.SubscriptionID==0) {
            this.mesg.SubscriptionID= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.SubscriptionID= false;
            this.isTabFill = true;
        }

        if (this.company.City==='') {
            this.mesg.City= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.City= false;
            this.isTabFill = true;
        }

        if (this.company.Status==0) {
            this.mesg.Status= true;
            this.isSave = false;
            this.isTabFill = false;
        }else{
            this.mesg.Status= false;
            this.isTabFill = true;
        }

        if (this.company.Location==='') {
            this.mesg.Location= true;
            this.isSave = false;
        }else{
            this.mesg.Location= false;
        }

        if (this.company.Country==='') {
            this.mesg.Country= true;
            this.isSave = false;
        }else{
            this.mesg.Country= false;
        }

        if (this.company.Building_No==0) {
            this.mesg.Building_No= true;
            this.isSave = false;
        }else{
            this.mesg.Building_No= false;
        }

        if (this.company.Town==='') {
            this.mesg.Town= true;
            this.isSave = false;
        }else{
            this.mesg.Town= false;
        }

        if (this.company.Street==='') {
            this.mesg.Street= true;
            this.isSave = false;
        }else{
            this.mesg.Street= false;
        }

        if (this.company.Contact_Person==='') {
            this.mesg.Contact_Person= true;
            this.isSave = false;
        }else{
            this.mesg.Contact_Person= false;
        }

        if (this.company.Contact_Person_Email==='') {
            this.mesg.Contact_Person_Email= true;
            this.isSave = false;
        }else{
            this.mesg.Contact_Person_Email= false;
        }

        if (this.company.Landline_No==='') {
            this.mesg.Landline_No= true;
            this.isSave = false;
        }else{
            this.mesg.Landline_No= false;
        }

        if (this.company.Mobile_No==='') {
            this.mesg.Mobile_No= true;
            this.isSave = false;
        }else{
            this.mesg.Mobile_No= false;
        }

        this.partialCompanyForm.checkError(this.mesg);
    }

    isSuperAdmin() {
        if (this.temp.Role == 18) {
         //   console.log("true ");
            return true;
        }
        else {
          //  console.log("false ");
            return false;
        }

    }
    
    addCompany() {
        this.doCheck();
       // this.partialCompany.onLinkClick();
        //console.log("Company Model for ADD::"+JSON.stringify(this.company));   
        if(this.isSave){
            this.companyService.addCompnay(this.company).subscribe(data => {
                // Read the result field from the JSON response.
                //console.log("post success" + data.statusMessage + data.statusCode);
                if (data.statusCode == "1") {
                    this.company.id=data.Result.id;
                    this.getAllCompanies();
                    this.initTable();                    
                    //this.companies.push({companyData: this.company})
                    //console.log({companyData: this.company});
                    this.uiService.alertSuccess("Company Added Successfuly");
                    if (this.company.Logo != undefined){
                        if (this.company.Logo.length > 10){
                            this.uploadLogo(data.Result.id);
                        }
                    }
                }else if(data.statusCode == "0"){
                    //this.errorMsg = data.statusMessage;
                    this.uiService.alertError(data.statusMessage+": "+JSON.stringify(data.Result));
                }
                else {
                    this.uiService.alertError(data.statusMessage);
                }
            });
        }else{
            //alert("Please Enter mandatory Fields!");
            this.uiService.alertError("Please fill all requried field");
        }
    }

    getAllCompanies() {
       // console.log("get all companies from view start");

        this.companyService.getCompanies().subscribe(data => {
            //     console.log("get all companies success" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                this.companies = data.Result;
                //console.log(this.companies);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        });
        //console.log("comp:::"+JSON.stringify(this.companies));
    }

    deleteCompany() {
        // this.errorMsg = "";
        this.successMsg = "";

        this.selectedCompany = this.companies.filter(_ => _.companyData.selected);
        //console.log("selected company:"+ JSON.stringify(this.selectedCompany));
        for (var company in this.selectedCompany) {
            //console.log(" company:::"+ JSON.stringify(company));
            this.companyService.deleteCompany(this.selectedCompany[company].companyData.id).subscribe(data => {
                //console.log("delete by id" + data.statusMessage + data.statusCode);
                if (data.statusCode == "1") {
                    this.getAllCompanies();
                    //location.reload();
                    //this.companies.pop(this.selectedCompany[company]);
                    this.uiService.alertSuccess("Company Deleted Successfuly");
                    //this.successMsg = "Company Deleted Successfuly";
                    //this.companies = this.companies.filter(h => h.id !== Number.parseInt(id));
                    this.initTable();
                }
                else {
                    this.uiService.alertError(data.statusMessage);
                }
            });
        }
    }

    changeCompany(comp: any) {
        this.company = comp.companyData;
        this.company.currentTabIndex = 0;
        this.company.SocialMediaLinks = comp.SocialMediaData;
        // console.log(this.company);
         this.partialCompany.setMediaIDs(this.company.SocialMediaLinks);
    }
    destroyData() {
        this.company = new CompanyModel();
        this.company.currentTabIndex = 0;
    }
    getCompDataForCheck(comapny) {
        this.companyService.getCompanyAgainstCompanyID(comapny.id).subscribe(data => {
            if (data.statusCode == "1") {
                let somedata = data.Result;
                //console.log(somedata);
                this.checkDataChenge(somedata, comapny);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        });
    }
    checkDataChenge(singleData, company) {
        console.log(company);
        if (
            singleData[0].companyData.Address != company.Address ||
            singleData[0].companyData.Company_Name != company.Company_Name ||
            singleData[0].companyData.Max_Allowed_Branches != company.Max_Allowed_Branches ||
            singleData[0].companyData.SubscriptionID != company.SubscriptionID ||
            singleData[0].companyData.Status != company.Status ||
            singleData[0].companyData.Country != company.Country ||
            singleData[0].companyData.City != company.City ||
            singleData[0].companyData.Town != company.Town ||
            singleData[0].companyData.Street != company.Street ||
            singleData[0].companyData.Building_No != company.Building_No ||
            singleData[0].companyData.Mobile_No != company.Mobile_No ||
            singleData[0].companyData.Landline_No != company.Landline_No ||
            singleData[0].companyData.Location != company.Location ||
            singleData[0].companyData.Contact_Person != company.Contact_Person ||
            singleData[0].companyData.Contact_Person_Email != company.Contact_Person_Email ||
            singleData[0].companyData.URL != company.URL ||
            singleData[0].companyData.ContactNumber != company.ContactNumber ||
            singleData[0].companyData.Software_Services_Level != company.Software_Services_Level ||
            singleData[0].companyData.Company_Website != company.Company_Website ||
            singleData[0].SocialMediaData.length !=    company.SocialMediaLinks.length 
           ) {
                this.companyService.editCompany(this.company).subscribe(data => {
                    if (data.statusCode == "1") {
                        this.isSave = true;
                        this.uiService.alertSuccess("Company Updated Successfuly");
                        this.ngOnInit();
                        if (this.company.Logo != undefined)
                            if (this.company.Logo.length > 10)
                                this.uploadLogo(this.company.id);
                    }
                    else {
                        this.uiService.alertError(data.statusMessage);
                    }
                });

           } else {
            this.uiService.alertInfo("No changes are detected..");
           }
    }

    editCompany() {
        this.isSave = false;
        this.doCheck();
        this.getCompDataForCheck(this.company);
    }
    uploadLogo(compId: number) {
        console.log("upload logo userID:"+this.temp.id);
        //this.successMsg = "Uploading Logo...";
        console.log("image: "+this.company.Logo);
        this.params = new HttpParams()
        .set('userID', this.temp.id)
        .set('content_type', '.png');
        console.log("user token: "+this.temp.token);
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        this.http.post<AddLogoResponse>(PediturkApi.uploadCompanyLogo + compId, this.company.Logo, { headers: this.headers, params: this.params }).subscribe(data => {
            // Read the result field from the JSON response.
            console.log("post success" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                //this.uiService.alertSuccess("Logo Uploaded Successfuly");
            }
            else {
                //this.uiService.alertError("Sorry, Logo Couldn't Be Uploaded");
            }
        });
    }

    

    initTable() {
        $("#tblCompanyData").DataTable();
    }

    checkAll(){
        this.checkedBox = !this.checkedBox;
    }

    findStatus(value: number):string{
        for (var status of this.statuses){
          if(status.id == value){
            return status.value;
          }
        }
    }

    findComapnyType(value: number):string{
        for (var type of this.companyTypes){
          if(type.id == value){
            return type.value;
          }
        }
    }

    findSubscriptionType(value: number):string{
        for (var subType of this.subscriptionTypes){
          if(subType.id == value){
            return subType.value;
          }
        }
    }
}

export interface Result {
    id: number;
    Company_Name: string;
    created_at: string;
    updated_at: string;
    URL: string;
    Logo: string;
    Address: string;
    ContactNumber: string;
}

export interface AddLogoResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
}

export class errorMsgs {
    Company_Name: boolean= false;
    Company_Type: boolean= false;
    Company_Admin_Email: boolean= false;
    Admin_Password: boolean= false;
    Max_Allowed_Branches: boolean= false;
    SubscriptionID: boolean= false;
    City: boolean= false;
    Status: boolean= false;
    Location: boolean= false;
    Country: boolean= false;
    Building_No: boolean= false;
    Town: boolean= false;
    Street: boolean= false;
    Contact_Person: boolean= false;
    Contact_Person_Email: boolean= false;
    Landline_No: boolean= false;
    Mobile_No: boolean= false;

}
