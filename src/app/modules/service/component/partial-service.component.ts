import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceModel } from '../models/service.model';
import { CategoryModel } from '../models/service-category.model';
import { CompanyService } from '../../company/services/company.service';
import { BranchService } from '../../branch/services/branch.service';
import { DepartmentService } from '../../department/services/department.service';
import { BranchViewResponse } from '../../branch/models/branch-view-response.model';



import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { ServiceService } from '../services/service.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';


declare var $: any;
@Component({
    selector: 'partial-service',
    templateUrl: '../templates/partial-service.component.html',
    styles: [`
    .ng-valid[required], .ng-valid.required {
        border-color: #42A948; / green /
    }
    .ng-invalid:not(form) {
        border-color: #a94442; / red /
    }
    `],
})


export class PartialServiceComponent implements OnInit, OnDestroy {
    [x: string]: any;
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    private params;
    private subscription: Subscription;
    private headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Content-Type', 'application/json')
    .set('Authorization', this.temp.token);

    serviceMessage: string;
    errorMsg: string;
    successMsg: string;
    tempLogo: string;
    companies: Result[];
    branches: Result[];
    departments: Result[];
    errors: errorMsgs;
    isSave: boolean = false;
    isOpen: boolean = true;
    selectedService: any;
    services: any;
    categoryList: any;
    statuses: any[];
    company: Result = { 'text': 'Select Company', 'id': 0 };
    branch: Result = { "text": 'Select Branch', "id": 0 };
    department: Result = { "text": 'Select Department', "id": 0 };
    companyId: any;
    @Input()
    serviceCategory: CategoryModel;
    @Input()
    service: ServiceModel;
    isCatSave = true;
    isOpenChechk = true;
    newServiceData: any = '';
    serviceMessageID = 1;
    constructor(
        private companyService: CompanyService,
        private branchService: BranchService,
        private departmentService: DepartmentService,
        private http: HttpClient,
        private router: Router,
        private serviceService: ServiceService,
        private uiService: UIService
    ) {
        this.companyId = localStorage.getItem('Company_ID');
        this.serviceCategory=new CategoryModel();
        this.errors = new errorMsgs();
        this.statuses = [
            {'id': 1, 'value': 'Active'},
            {'id': 2, 'value': 'Inactive'},
            {'id': 3, 'value': 'Open'},
            {'id': 4, 'value': 'Closed'},
        ]
     }

    ngOnInit(): void {
        //this.getAllBranches();
        //this.getAllCompanies();
        //this.getAllDepartment();
        //this.getServiceAgainstCompanyID();
        //this.getAllServices();
        this.getServiceListOfCompany();
        this.getServiceCategoriesOfCompany();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        // console.log("ngOnDestroy");
    }
    assignNew() {
        // alert('yes');
        this.serviceCategory = new CategoryModel();
    }

    getAllServices() {
        //console.log("get all service start");

        this.subscription = this.serviceService.getAllService().subscribe(data => {
            if (data.statusCode == "1") {
                //yahan respose ka modle use kena
                this.services = data.Result;
                // console.log("departmments",JSON.stringify(this.departments));
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
       //this.subscription.add(subscription);
    }

    newService() {
        this.service = new ServiceModel();
        this.errors = new errorMsgs();
        this.isOpen = true;
        this.isOpenChechk = true;
    }

    getServiceListOfCompany() {
        this.serviceMessage = 'All Services';
        this.subscription = this.serviceService.getServicesOfCompany(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.services = data.Result;
                this.serviceMessageID = 1;
                this.isOpen = false;
                this.service.checkboxCheck = false;
                console.log(this.services);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    setCategoryModel(category: CategoryModel){
        // console.log("set cat::"+JSON.stringify(category));
        this.serviceCategory = category;
    }
    checkServicesCategoryNameAlReady(id){
        for (let i = 0; i < this.categoryList.length; i++ ) {
            if (this.categoryList[i].id != id ) {
               let d1 = this.categoryList[i].Services_Category_Name.toUpperCase();
                let d2 = this.serviceCategory.Services_Category_Name.toUpperCase();
                if (d1 === d2){
                    this.uiService.alertError('Category with this name already in use, Please try another name...');
                    return false;
                }
            }
        }
        return true;
    }
    addServiceCategory(){
        this.serviceCategory.Company_ID = this.companyId;
        this.isCatSave = true;
        // console.log("service model::"+JSON.stringify(this.serviceCategory));
        if(!this.checkServicesCategoryNameAlReady(-1)) {
            this.serviceCategory.Services_Category_Name = '';
            this.isCatSave = false;
            return;
        }
        this.subscription = this.serviceService.createCategory(this.serviceCategory).subscribe(data => {

            if (data.statusCode == "1") {
                this.isCatSave = true;
                this.serviceCategory = data.Result;
                this.categoryList.push(this.serviceCategory);
                this.uiService.alertSuccess("Category Added Successfuly");
            }
            else {
                this.isCatSave = false;
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    editServiceCategory(){
        this.isCatSave = true;
        // console.log("service model::"+JSON.stringify(this.serviceCategory));
        if(!this.checkServicesCategoryNameAlReady(this.serviceCategory.id)) {
            this.serviceCategory.Services_Category_Name = '';
            this.isCatSave = false;
            return;
        }
        this.subscription = this.serviceService.updateCategory(this.serviceCategory).subscribe(data => {

            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Category Updated Successfuly");
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    removeServiceCategory(category: CategoryModel){
        this.subscription = this.serviceService.deleteCategory(category.id).subscribe(data => {

            if (data.statusCode == "1") {
                this.categoryList.splice(this.categoryList
                    .findIndex(category => category.id == this.serviceCategory.id), 1);
                this.uiService.alertSuccess("Category Deleted Successfuly");
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    getServiceCategoryList(){
        this.subscription = this.serviceService.readCategoryList().subscribe(data => {
            if (data.statusCode == "1") {
                this.categoryList = data.Result;
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    getServiceCategoriesOfCompany(){
        this.subscription = this.serviceService.readCategoriesOfCompany(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.categoryList = data.Result;
                // console.log(this.categoryList);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }
    checkTestingMode(e) {
        if (e.target.checked) {
            if (this.categoryList.length === 0) {
                this.uiService.alertError('No category found, Please create new category..');
                this.service.checkboxCheck = e.target.checked;
                // this.service = new ServiceModel();
                return;
            } 
        }
        this.service.checkboxCheck = e.target.checked;
        if (e.target.checked) {
            this.service.service_CatID = this.serviceMessageID;
            this.service.Service_Name = 'Test service';
            this.service.Visibility = 1;
            this.service.Price = 123;
            this.service.Duration = 'Sample Duration';
            this.service.Padding_Time_Before = '08:56';
            this.service.Padding_Time_After = '08:56';
            this.service.Capacity = '123';
            this.service.Service_Providers = 123;
            this.service.Info = 'Test info';
            this.service.Status = 1;
            this.service.Service_Commission_Type = 'Sample type';
            this.service.Service_Commission_Rate = 123;
        } else {
            this.service = new ServiceModel();
        }

    }
    addService(){
        this.doCheck();
        if(this.isSave){
            this.service.Company_ID = this.companyId; //there will be company_id of that company, whose company admin will be login
            if(this.service.Color === ''){
                this.service.Color = '#00ff00';
            }
            console.log(this.service);

            this.subscription = this.serviceService.addService(this.service).subscribe(data => {
                //console.log("post success" + data.statusMessage + data.statusCode);
                if (data.statusCode == "1") {
                    this.isOpen = false;
                    this.uiService.alertSuccess("Service Added Successfuly");
                    if (this.tempLogo != undefined) {
                        if (this.tempLogo.length > 10)
                            this.uploadLogo(data.Result.id.toString());
                    } else {
                        // console.log("is tempLogo NULL::" + this.service.Thumbnail);
                    }
                    this.getServiceListOfCompany();
                }
                else {
                    this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
                }
            });
        }
    }
    getServicesOfCompanyByID(service) {
        this.subscription = this.serviceService.getServicesOfCompanyByID(service.id).subscribe(data => {
            if (data.statusCode == "1") {
                this.newServiceData = data.Result;
                // console.log(this.newServiceData);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }
    detectChangeData(newdData, oldService) {
        let backData = false;
        if (
            newdData.Capacity != oldService.Capacity ||
            newdData.Color != oldService.Color ||
            newdData.Duration != oldService.Duration ||
            newdData.Info != oldService.Info ||
            newdData.Padding_Time_After != oldService.Padding_Time_After ||
            newdData.Padding_Time_Before != oldService.Padding_Time_Before ||
            newdData.Price != oldService.Price ||
            newdData.Service_Commission_Rate != oldService.Service_Commission_Rate ||
            newdData.Service_Commission_Type != oldService.Service_Commission_Type ||
            newdData.Service_Name != oldService.Service_Name ||
            newdData.Service_Providers != oldService.Service_Providers ||
            newdData.Status != oldService.Status ||
            newdData.Thumbnail != oldService.Thumbnail ||
            newdData.Visibility != oldService.Visibility
        ) {
            
        } else {
            backData = true;
            this.uiService.alertInfo('No changes were detected');
        }
        return backData;
    }

    editService(){
        this.doCheck();
        //console.log(this.newServiceData);
        let temp = this.detectChangeData(this.newServiceData, this.service);
        if (temp) {
            this.isSave = false;
        }
        this.tempLogo = this.service.Thumbnail;
        this.service.Thumbnail = null;
        if(this.isSave){
            this.subscription = this.serviceService.editService(this.service).subscribe(data => {
                //console.log("update res:"+JSON.stringify(data));
                if (data.statusCode == "1") {
                    this.isOpen = false;                    
                    this.uiService.alertSuccess("Service Updated Successfuly");
                    if (this.tempLogo != undefined) {
                        if (this.tempLogo.length > 10)
                            this.uploadLogo(data.Result.id.toString());
                    } else {
                        // console.log("is tempLogo NULL::" + this.service.Thumbnail);
                    }
                }
                else {
                    this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
                }
            });
        }
    }

    removeService() {
        this.selectedService = this.services.filter(_ => _.selected);
        for (var service in this.selectedService) {
            this.subscription = this.serviceService.deleteService(this.selectedService[service].id).subscribe(data => {
                if (data.statusCode == "1") {
                    this.uiService.alertSuccess("Service Deleted Successfuly");
                    //console.log("service index::"+this.services.findIndex(service));
                    //this.services.splice(service, 1);
                    this.getServiceListOfCompany();
                }
                else {
                    this.uiService.alertError(data.statusMessage);
                }
            });
        }
    }

    displayServicesOfCategory(category: CategoryModel) {
        this.serviceMessage = category.Services_Category_Name;
        this.serviceMessageID = category.id;
        this.service.service_CatID = category.id;
        // alert(this.serviceMessageID);
        this.isOpen = false;
       // console.log("CAT id:-" + category.id);
        this.serviceService.getServicesOfCategory(category.id).subscribe(data => {
            if (data.statusCode == "1") {
                this.services = data.Result;
                 // console.log("departmments",JSON.stringify(this.services));
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    // changeService(dep: ServiceModel) {
    //     this.service = dep;
    // }


    uploadLogo(serId: string) {
        //console.log("upload thumbnail req");
        this.successMsg = "Uploading thumbnail...";

        this.headers = new HttpHeaders()
            .set('Authorization', this.temp.token)
            .set('Content-Type', 'application/json');

        this.params = new HttpParams()
            .set('content_type', '.png')
            .set('userID', this.temp.id);
        // this.uiService.alertSuccess(this.temp.id+"");

        //console.log(" TOKEN :" + this.temp.token);

        //      this.service.Thumbnail=this.service.templogo;

        //    console.log("thumbnail  : "+this.service.Thumbnail);
        this.subscription = this.http.post<AddThumbnailResponse>(PediturkApi.uploadThumbnail + serId, this.service.Thumbnail, { headers: this.headers, params: this.params }).subscribe(data => {
            // Read the result field from the JSON response.
            //console.log("post success" + data.statusMessage + data.statusCode + this.temp.id);
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("thumbnail Uploaded Successfuly");
                // this.successMsg = "thumbnail Uploaded Successfuly";
            }
            else {
                this.uiService.alertSuccess("Sorry, thumbnail Couldn't Be Uploaded");
                //   this.errorMsg = "Sorry, thumbnail Couldn't Be Uploaded";
            }
        },
            // error callback
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    //  errorMsg: string;
    //  successMsg: string;
    getAllCompanies() {
        //console.log("get all companies start");

        this.subscription = this.companyService.getCompanies().subscribe(data => {
            if (data.statusCode == "1") {
                this.companies = data.Result.map(function (a) {
                    return {
                        text: a.companyData.Company_Name,
                        id: a.companyData.id
                    };
                });
            }
            else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }
    // temp2;
    tempBranches;

    getAllBranches() {
        //console.log("get all branches start");

        this.subscription = this.branchService.getBranches().subscribe(data => {
            if (data.statusCode == "1") {
                this.tempBranches = data.Result;
                //this.temp2= data.Result;
                this.branches = data.Result.map(function (a) {
                    return {
                        text: a.BranchData.Name,
                        id: a.BranchData.id
                    };
                });
                //   this.branches= data.Result;

            }
            else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    tempDepartments;
    getAllDepartment() {
        //console.log("get all branches start");

        this.subscription = this.departmentService.getAllDepartments().subscribe(data => {
            if (data.statusCode == "1") {

                this.tempDepartments = data.Result;

                //  console.log("get all branches start",JSON.stringify(this.tempDepartments));
                //this.temp2= data.Result;
                this.departments = data.Result.map(function (a) {
                    return {
                        text: a.Department_Name,
                        id: a.id
                    };
                });
                // console.log("get all departments start", JSON.stringify(this.departments));

                //   this.branches= data.Result;

            }
            else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    public changeService(service: any): void {
        this.service = service;
        this.getServicesOfCompanyByID(this.service);
        // console.log(this.service);
        this.isOpen = true;
        this.isOpenChechk = false;        
        // alert(this.isOpenChechk);
    }
    companyID: string;
    companyName: string;
    companynameandid: string[];
    filteredBranches;

    public selectedCompany(value: any): void {

        //console.log('Selected value is: ', value);

        this.companyID = value.id;
        this.service.Company_ID = +this.companyID;

        //console.log('id: ', this.companyID);
        this.companyName = value.text;
        //console.log('company name: ', this.companyName);
        this.branches = null;
        //binding company id

        //console.log('company : ', this.service.Company_ID);

        this.filteredBranches = this.tempBranches.filter(tempBranch => tempBranch.company_ID == value.id);

        //console.log('branches ',JSON.stringify(this.filteredBranches)  );

        this.branches = this.filteredBranches.map(function (a) {
            return {
                text: a.Name,
                id: a.id

            };
        });

    }

    public removedCompany(value: any): void {

        //console.log('removed ', JSON.stringify(this.branches));
        this.branches = null;
        this.branches = this.tempBranches;
        //this.initTable();
    }

    branchid
    filteredDepartments
    public selectedBranchDep(value: any): void {
        this.departments = null;

        this.branchid = value.id;
        //this.service.Branch_ID = this.branchid;

        //console.log('departments : ' + this.branchid + JSON.stringify(this.tempDepartments));
        this.filteredDepartments = this.tempDepartments.filter(tempDepartment => tempDepartment.BranchID == value.id);
        // console.log('filteredDepartments : ', JSON.stringify(this.filteredDepartments));
        this.departments = this.filteredDepartments.map(function (a) {
            return {
                text: a.Department_Name,
                id: a.id

            };
        });
        // console.log('departments : ',   JSON.stringify(this.departments));
    }

    public removedBranchDep(value: any): void {

        this.departments = null;
        this.departments = this.tempDepartments;
    }
    ///////////////////////////////////////////



    depID
    public selectedDepartments(value: any): void {
        this.depID = value.id;
        //this.service.Department_ID = this.depID;
        //console.log('branch : ', this.service.Branch_ID);
    }
    public removedDepartments(value: any): void {

        //console.log('removed ', JSON.stringify(this.branches));
        this.departments = null;
        this.departments = this.tempDepartments;
        this.initTable();
    }


    ///////////////////////////////////////////////////

    //for logo upload
    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.service.Thumbnail = btoa(binaryString);

        //this.service.templogo = this.service.Thumbnail;
    }
    checkServiceAlReady() {
        for (let i = 0; i < this.services.length; i++) {
            console.log(this.services[i].Service_Name);
            console.log(this.service.Service_Name)
            if (this.services[i].Service_Name === this.service.Service_Name ) {
                this.uiService.alertError('Service with this name already in use, Please try another name...');
                return false;
            }
        }
        return true;
    }
    doCheck() {
        //console.log(this.service);
        if (this.isOpenChechk) {
            if (!this.checkServiceAlReady() ){
                this.service.Service_Name = '';
            }
        }
        this.isSave = true;
        if(this.service.service_CatID == undefined) {
            this.errors.serviceCategory= true;
            this.isSave = false;
        }else{
            this.errors.serviceCategory= false;
        }

         if (this.service.Service_Name === '') {
            this.errors.serviceName= true;
            this.isSave = false;
        }else{
            this.errors.serviceName= false;
        }

        if (this.service.Visibility == 0) {
            this.errors.visibility= true;
            this.isSave = false;
        }else{
            this.errors.visibility= false;
        }

        if (this.service.Price == 0) {
            this.errors.price= true;
            this.isSave = false;
        }else{
            this.errors.price= false;
        }

        if (this.service.Duration === '') {
            this.errors.duration= true;
            this.isSave = false;
        }else{
            this.errors.duration= false;
        }

        if (this.service.Padding_Time_Before === null) {
            this.errors.paddingTimeBefore= true;
            this.isSave = false;
        }else{
            this.errors.paddingTimeBefore= false;
        }

        if (this.service.Padding_Time_After === null) {
            this.errors.paddingTimeAfter= true;
            this.isSave = false;
        }else{
            this.errors.paddingTimeAfter= false;
        }

        if (this.service.Capacity === '') {
            this.errors.capacity= true;
            this.isSave = false;
        }else{
            this.errors.capacity= false;
        }

        if (this.service.Service_Providers == 0) {
            this.errors.serviceProviders= true;
            this.isSave = false;
        }else{
            this.errors.serviceProviders= false;
        }

        if (this.service.Info === '') {
            this.errors.info= true;
            this.isSave = false;
        }else{
            this.errors.info= false;
        }

        if (this.service.Status == 0) {
            this.errors.status= true;
            this.isSave = false;
        }else{
            this.errors.status= false;
        }

        if (this.service.Service_Commission_Type==='') {
            this.errors.serviceCommissionType = true;
            this.isSave = false;
        }else{
            this.errors.serviceCommissionType = false;
        }

        if (this.service.Service_Commission_Rate == 0) {
            this.errors.serviceCommissionRate = true;
            this.isSave = false;
        }else{
            this.errors.serviceCommissionRate = false;
        }

        // this.partialCompanyForm.checkError(this.mesg);
    }

}


export interface Result {
    id: number;
    text: string;


}

export interface AddThumbnailResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
}

export class errorMsgs {
    serviceCategory: boolean = false;
    serviceName: boolean = false;
    visibility: boolean = false;
    price: boolean = false;
    duration: boolean = false;
    paddingTimeBefore: boolean = false;
    paddingTimeAfter: boolean = false;
    capacity: boolean = false;
    serviceProviders: boolean = false;
    info: boolean = false;
    status: boolean = false;
    serviceCommissionType: boolean = false;
    serviceCommissionRate: boolean = false;

}
