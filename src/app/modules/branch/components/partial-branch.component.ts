import { Component, DoCheck, Input, OnInit, OnChanges } from '@angular/core';
import { BranchModel } from '../models/branch.model';
import { CompanyService } from '../../company/services/company.service';
import { ErrorMsgs, BranchViewComponent } from './branch-view.component';
import { COUNTRIES } from '../../shared/components/country';
import * as countryData from '../../shared/components/data.json';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { getRandomString } from 'selenium-webdriver/safari';
import { BranchService } from '../services/branch.service';
import { UIService } from '../../shared/services/ui.service';
import { DepartmentService } from '../../department/services/department.service';
import { DepartmentModel, BranchDepartmentModel }  from '../../department/models/department.model';
import { ServiceService } from '../../service/services/service.service';

export const STATUSES = [
  {'id': 1, 'value': 'Active'},
  {'id': 2, 'value': 'Inactive'},
  {'id': 3, 'value': 'Open'},
  {'id': 4, 'value': 'Closed'},
]

@Component({
  selector: 'partial-branch',
  templateUrl: '../templates/partial-branch.component.html',
  styles: [`
  .ng-valid[required], .ng-valid.required {
    border-color: #42A948; / green /
  }
  .ng-invalid:not(form) {
    border-color: #a94442; / red /
  }
  `],
  exportAs: 'partialBranchForm'
})

export class PartialBranchComponent implements OnInit, DoCheck {
  latLng: string = "41.015137";
  //lng: number = 28.979530;
  companies: any = [];
  @Input() branch: BranchModel;
  @Input() branchDepartmentsArray;
  @Input() currentTabIndex;
  newTodo: string;
  @Input()
  isAdded: boolean;
  @Input()
  todos: any;
  Description: any[];
  links: any;
  todoObj: any;
  public isMatch: boolean = true;
  @Input()
  errors: ErrorMsgs;
  @Input() branches: any;
  countryList: any[];
  cityList: any[];
  statuses:any[];
  errorMsg: string;
  successMsg: string;
  @Input()
  isFill: boolean = true;
  @Input()
  tabCheck: boolean=false;
  @Input()
  tab2Check: boolean=false;
  isCountrySelected: boolean = true;
  cNameAlReadyInUse: boolean;
  emailAlReadyInUse: boolean;
  departments: any[] = [];
  isMovedLeft;
  isMovedRight;
  companyId;
  branchId;
  branchDeparment: BranchDepartmentModel; 
  newdepartments: any;
  branchDeparmentIN = false;
  branchSocialIN = false;
  testCheckBox = false;
  services;
  tempService;
  branchServices: any[] = []; 
  constructor(private serviceService: ServiceService, private   departmentService: DepartmentService, private companyService: CompanyService , private uiService: UIService ,  private branchService: BranchService) {
    this.countryList = this.getCountries();
    this.newTodo = '';
    this.todos = [];
    this.Description = [];
    this.errors = new ErrorMsgs();
    this.isFill = true;
    this.statuses = STATUSES;
    this.companyId = localStorage.getItem('Company_ID');
  }
  ngOnInit(): void {
    this.getAllCompanies();
    this.getBranchesAgainstComapnyID();
    this.getDepartmentsAgianstCommpanyID();
    this.branchSocialIN = false;
    this.branchDeparmentIN = false;
    this.getServiceListOfCompany();
    // this.getDepartmentListOfBranch();
  }
  setNewDataWhen() {
    this.getDepartmentsAgianstCommpanyID();
    this.getServiceListOfCompany();
  }
  ngDoCheck(){
    if(this.branch.Country == '' || this.branch.Country == undefined){
      this.isCountrySelected = true;
    }else{
      this.isCountrySelected = false;
      this.cityList = this.getCities(this.branch.Country);
    }
  }
  getBranchesAgainstComapnyID() {
    // console.log("Max:::"+this.maxAllowBranches);
    let companyId = localStorage.getItem('Company_ID');
    this.branchService.getBranchesAgainstCompanyID(companyId).subscribe(data => {
      if (data.statusCode == "1") {
        this.branches = data.Result;
        //this.temp = data.Result;
        // console.log(this.branches);
        // this.branchCount = data.Result.length;
        
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
 
  setMapLngLat(): void {
    this.branch.Location = this.latLng;
  }

  getCountries() {
		var countries = [];
		for (let key in countryData["countries"]) {
      countries.push (key);
		}
		return countries;
  }

  getCities(country) {
    var cities = [];
		var splits = country.split(" ");
		country = null;
		splits.forEach(
			function (split) {
				split = split.charAt(0).toUpperCase() + split.slice(1);
				country = ((country) ? (country + ' ' + split) : split);
      });
      cities = countryData["countries"][country];
      if(cities.length == 0){
        cities.push(country);
      }
		return cities;
	}

  onMapClick(event) {
    this.latLng = event.latLng;
    this.latLng = this.latLng.toString();
    this.latLng = this.latLng.replace("(", "");
    this.latLng = this.latLng.replace(")", "");
    this.latLng = this.latLng.trim();
    //this.lng=event.lng;

  }
  checkCompanyAlready(id) {
    this.cNameAlReadyInUse = false;
    for (let i = 0; i < this.branches.length; i++ ) {
      if (id != this.branches[i].BranchData.id) {
        let d1 = this.branches[i].BranchData.Name.toUpperCase();
        let d2 = this.branch.Name.toUpperCase();
        if( d1 == d2 ) {
        this.cNameAlReadyInUse = true;
        this.branch.newTabIndex = 0;
        break;
      }
    }
    }
    return this.cNameAlReadyInUse;
  }
  checkEmailAlready(id) {
    this.emailAlReadyInUse = false;
    for (let i = 0; i < this.branches.length; i++ ) {
      if (id != this.branches[i].BranchData.id) {
        let d1 = this.branches[i].BranchData.Email.toUpperCase();
        let d2 = this.branch.branch_Admin_Email.toUpperCase();
        if( d1 === d2 ) {
          this.cNameAlReadyInUse = true;
          return true;
        }
      }
    }
    return false;
  }
  getAllCompanies() {
    // console.log("get all companies start");

    this.companyService.getCompanies().subscribe(data => {
      //     console.log("get all companies success" + data.statusMessage + data.statusCode);
      if (data.statusCode == "1") {
        this.companies = data.Result;
        // console.log(this.companies);
      }
      else {
        this.errorMsg = "Sorry, Something went wrong";
      }
    },
      err => {
        this.uiService.alertError( 'Sorry, Something went wrong' );
      },
      () => {

      }
    );
  }


  selected: any;
  value: string;
  companynameandid: string[];
  onChange(selected: any) {

    // console.log('selected item ' + this.selected);
    this.value = this.selected + "";

    this.companynameandid = this.value.split(',');
    this.branch.Branch_Type = this.companynameandid[1];
    this.branch.company_ID = +this.companynameandid[0];

   //  console.log('selected item ' + this.companynameandid[0] + this.companynameandid[1]);

  }

  selectBranchDepartment(department: any){
    department.isSelected = !department.isSelected;
}

  addTodo(event) {
    this.todoObj = {
      newTodo: this.newTodo,
      completed: false
    }
    this.todos.push(this.todoObj);
    this.Description.push(this.newTodo);
    this.branch.SocialMediaLinks.push(this.newTodo);
    // console.log(this.branch.SocialMediaLinks);
    this.links = {
      Description: this.Description
    }
    // console.log("todo function->" + JSON.stringify(this.links));
    this.newTodo = '';
    event.preventDefault();
    this.branchSocialIN = true;
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.branch.SocialMediaLinks.splice(index, 1);
    this.Description.splice(index, 1);
    this.branchSocialIN = true;
  }
  confirmPass() {
    if (this.branch.confirmPassword === this.branch.Admin_Password) {
      this.isMatch = true;
    } else {
      this.isMatch = false;
    }
  }
  public checkError(errorMsgs) {
    this.errors = errorMsgs;
  }

  onLinkClick(event) {
    // console.log(this.branch.branch_Admin_Email);
    if(this.checkCompanyAlready(this.branch.id)) {
      this.uiService.alertError ('This Name of Branch Already in Use, Please use another name..' ) ;
      this.branch.Name = '';
    }
    if (this.checkEmailAlready(this.branch.id)) {
      this.uiService.alertError ('This Email Already in Use, Please use another Email..' ) ;
      this.branch.branch_Admin_Email = '';    
    }
    if (
      this.branch.Name === '' ||
      this.branch.branch_Admin_Email === '' ||
      this.branch.Admin_Password === '' ||
      this.branch.Status == undefined
    ) {
      this.branch.newTabIndex = 0;

      this.errors.Branch_Name = true;
      this.errors.branch_Admin_Email = true;
      this.errors.Admin_Password = true;
      this.errors.Status = true;
    } else if (
      this.branch.Location === '' ||
      this.branch.Country === '' ||
      this.branch.Building_No == 0 ||
      this.branch.City === ''
    ) {
      if (event.index === 0) {
        this.branch.newTabIndex = 0;
      } else {
        this.branch.newTabIndex = 1;

        this.errors.Location = true;
        this.errors.Country = true;
        this.errors.Building_No = true;
        this.errors.City = true;
      }

    } else if (
      this.branch.Contact_Person === ''
    ) {
      if (event.index === 0) {
        this.branch.newTabIndex = 0;
      } else if (event.index === 1) {
        this.branch.newTabIndex = 1;
      } else {
        this.isFill = false;
        this.branch.newTabIndex = 2;

        this.errors.contact_Person = true;
      }
    } else {
      // alert('now');
      if (event.index === 0 || event.index === 1 || event.index === 2 || event.index === 3) {
        //alert('nowsss');
        this.branch.newTabIndex = event.index;
        return;
      }
      if (event === 0 || event === 1 || event === 2) {
        // alert('now');
        this.branch.newTabIndex = event + 1;
        return;
      }

    }if (this.branch.newTabIndex == 0) {
      this.isFill = true;
      //this.currentTabIndex = 1;
    } else if (this.branch.newTabIndex == 1) {
      this.isFill = true;
    } else {
      this.isFill = false;
    }
  }

  setMediaIDs(SocialMediaLinks, id) {
  // console.log(id);
  this.getDepartmentListOfBranch(id);
    this.todos = [];
    // console.log("Partial-branch-IDs::" + JSON.stringify(this.branch.SocialMediaLinks));
    if (SocialMediaLinks.length > 0) {
      // console.log("Partial-branch-ID-if::" + JSON.stringify(this.branch.SocialMediaLinks));
      for (var i = 0; i < SocialMediaLinks.length; i++) {
        this.todoObj = {
          newTodo: SocialMediaLinks[i].Description,
          completed: false
        }
        this.todos.push(this.todoObj);
        this.branch.SocialMediaLinks.push(SocialMediaLinks[i].Description);
      }
    }
    // console.log(this.branch);
  }

  getDepartmentsAgianstCommpanyID() {

    this.departmentService.getDepartmentsAgainstCompanyID(this.companyId).subscribe(data => {
        if (data.statusCode == "1") {
            this.branch.departments = data.Result;
            // console.log(this.departments);
            // alert('its done');
        }
        else {
            this.uiService.alertError("Sorry, Something went wrong");
        }
    },
        err => {
            this.uiService.alertError("Sorry, Something went wrong");
        },
        () => {

        }
    );
}

getDepartmentListOfBranch(id) {

    this.departmentService.getDepartmentOfBranchByID(id).subscribe(data => {
        if (data.statusCode == "1") {
            this.branch.branchDepartments = data.Result;
            this.branch.DepartmentID = [];
            for(let d of this.branch.branchDepartments){
              this.branch.DepartmentID.push(d.DepartmentID);
          };
            this.departmentService.getDepartmentsAgainstCompanyID(this.companyId).subscribe(data => {
              if (data.statusCode == "1") {
                  this.branch.departments = data.Result;
                  for (let j = 0; j < this.branch.branchDepartments.length; j++) {
                    for (let i = 0; i < this.branch.departments.length; i++ ) {
                        if (this.branch.branchDepartments[j].DepartmentID === this.branch.departments[i].id) {
                            this.branch.branchDepartments[j].Department_Name = this.branch.departments[i].Department_Name;
                            this.branch.branchDepartments[j].alReadyUploaded = true;
                            this.branch.departments.splice(i, 1);
                            
                        }
                    }
                }
              } 
            } 
          );
        }
        else {
            this.uiService.alertError("Sorry, Something went wrong");
        }
    },
        err => {
            this.uiService.alertError("Sorry, Something went wrong");
        });
}
selectDepartment(department: any){
  department.isSelected = !department.isSelected;
}
addDepartmentToBranch(){
  this.branchDeparment = new BranchDepartmentModel();
  this.branchDeparment.BranchID = this.branchId;        
  for(let d of this.branch.branchDepartments){
      this.branchDeparment.DepartmentID.push(d.DepartmentID);
  }
  // console.log(this.branchDeparment);
  this.departmentService.createDepartmentToBranch(this.branchDeparment).subscribe(data => {
      if (data.statusCode == "1") {
          this.uiService.alertSuccess("Department Assigned Successfuly");
          //this.getDepartmentListOfBranch();
          this.ngOnInit();              
      }
      else {
          this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
      }
  },
  err => {
      this.uiService.alertError(err.statusMessage + ':' + JSON.stringify(err.Result));
  });
}
makeBranchDepart() {
  this.branchDeparment = new BranchDepartmentModel();
  this.branchDeparment.BranchID = this.branchId;        
  for(let d of this.branch.branchDepartments){
      this.branchDeparment.DepartmentID.push(d.DepartmentID);
  }
  // console.log(this.branchDepartments);
  return this.branchDeparment;
}
pushToBranch(){
    let newMovedArr: any[] = [];
    this.branchDeparmentIN = true;
    for (let ser of this.branch.departments){
        if(ser.isSelected == true){
            ser.isSelected = false;
            ser.DepartmentID = ser.id;
            this.branch.branchDepartments.push(ser);
            newMovedArr.push(ser); 
        }
        if(this.isMovedLeft == true || this.isMovedRight == true && this.branch.branchDepartments.length != 0){
            this.isMovedLeft = false;
            this.isMovedRight = false;
        }
    }
    // console.log(this.branchDepartments);
    this.branchDeparment = new BranchDepartmentModel();
    this.branch.DepartmentID = [];
    for(let d of this.branch.branchDepartments){
        this.branch.DepartmentID.push(d.DepartmentID);
    }
    // console.log(this.branch.DepartmentID);
    for (let val of newMovedArr){
        let index = this.branch.departments.indexOf(val);
        this.branch.departments.splice(index,1);
    }
}

pushBackToDepartment(){
  this.branchDeparmentIN = true;
    let arr: any[] = [];        
    for (let ser of this.branch.branchDepartments){
        if(ser.isSelected == true){
            ser.isSelected = false;                
            this.branch.departments.push(ser);
            arr.push(ser);                  
        }
        if(this.isMovedLeft == true  || this.isMovedRight == true && this.branch.departments.length != 0){
            this.isMovedLeft = false;
            this.isMovedRight = false;                
        }           
    }
    for (let val of arr){
        let index = this.branch.branchDepartments.indexOf(val);
        this.branch.branchDepartments.splice(index,1);
    }
    this.branch.DepartmentID = [];
    for(let d of this.branch.branchDepartments){
      this.branch.DepartmentID.push(d.DepartmentID);
  }
}

pushAllToBranch(){
  this.branchDeparmentIN = true;
    for (let ser of this.branch.departments){
        if(ser.isSelected == true){
            ser.isSelected = false;
        }
        this.branch.branchDepartments.push(ser);
    }
    this.branch.departments =[];
    this.isMovedLeft = true;
    this.isMovedRight = false;
}

pushAllBackToDepartment(){
  this.branchDeparmentIN = true;
    for (let ser of this.branch.branchDepartments){
        if(ser.isSelected == true){
            ser.isSelected = false;
        }
        this.departments.push(ser);
    }
    this.branch.branchDepartments = [];
    this.isMovedLeft = false;
    this.isMovedRight = true;        
}

//===================== Work on assign services =============================//
  getServiceListOfCompany() {
    this.serviceService.getServicesOfCompany(this.companyId).subscribe(data => {
        if (data.statusCode == "1") {
            this.branch.services = data.Result;
            // console.log(this.services);
        }
        else {
            this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
        }
    });
  }
  getAllBranchAndServices() {
    this.serviceService.getAllBranchAndServices(this.companyId).subscribe(data => {
        if (data.statusCode == "1") {
            this.branch.branchServices = data.Result;
            for (let row of this.branch.branchServices) {
                for (let i = 0; i < this.services.length; i++ ) {
                    if (row.branch.ServiceID === this.services[i].id) {
                        // console.log(row, this.departments[i]) service_CatID
                        row.Service_Name = this.branch.services[i].Service_Name;
                        row.ServiceID = this.branch.services[i].id;
                        row.service_CatID = this.branch.services[i].service_CatID;
                        row.alReadyUploaded = true;
                        this.branch.services.splice(i, 1);
                        // console.log(this.branchServices[i]);
                    }
                }
            }
            // console.log(this.branchServices);
        }
        else {
            this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
        }
    });
  }

  selectService(service: any){
    service.isSelected = !service.isSelected;
    this.tempService = service;
  }

  selectBranchService(service: any){
      service.isSelected = !service.isSelected;
      // this.tempService = service;
  }

  pushToBranchs(){
    let arr: any[] = [];
    for (let ser of this.branch.services){
        if(ser.isSelected == true){
            ser.isSelected = false;
            ser.ServiceID = ser.id;
            this.branch.branchServices.push(ser);
            arr.push(ser);   
        }
        if(this.isMovedLeft == true || this.isMovedRight == true && this.branch.branchServices.length != 0){
            this.isMovedLeft = false;
            this.isMovedRight = false;
        }
    }
    this.branch.serviceID = [];
    for(let d of this.branch.branchServices){
        this.branch.serviceID.push(d.ServiceID);
    }
    for (let val of arr){
        let index = this.branch.services.indexOf(val);
        this.branch.services.splice(index,1);
    }
   // console.log(this.branch.serviceID);
}

pushBackToService(){
    let arr: any[] = [];        
    for (let ser of this.branch.branchServices){
        if(ser.isSelected == true){
            ser.isSelected = false;                
            this.branch.services.push(ser);
            arr.push(ser);                  
        }
        if(this.isMovedLeft == true  || this.isMovedRight == true && this.branch.services.length != 0){
            this.isMovedLeft = false;
            this.isMovedRight = false;                
        }           
    }
    for (let val of arr){
        let index = this.branch.branchServices.indexOf(val);
        this.branch.branchServices.splice(index,1);
    }
    this.branch.serviceID = [];
    for(let d of this.branch.branchServices){
      this.branch.serviceID.push(d.ServiceID);
  }
    // console.log(this.branch.serviceID);
}

pushAllToBranchs(){
    for (let ser of this.branch.services){
        if(ser.isSelected == true){
            ser.isSelected = false;
        }
        ser.ServiceID = ser.id;
        this.branch.branchServices.push(ser);
    }
    this.branch.serviceID = [];
    for(let d of this.branch.branchServices){
      this.branch.serviceID.push(d.ServiceID);
  }
 // console.log(this.branch.serviceID);
    this.branch.services =[];
    this.isMovedLeft = true;
    this.isMovedRight = false;
   
}

pushAllBackToService(){
    for (let ser of this.branch.branchServices){
        if(ser.isSelected == true){
            ser.isSelected = false;
        }
        this.branch.services.push(ser);
    }
    this.branch.serviceID = [];
 //  console.log(this.branch.serviceID);
    this.branch.branchServices = [];
    this.isMovedLeft = false;
    this.isMovedRight = true;        
}
//===================== Work on assign services =============================//
}
export interface Result {
  id: number;
  Company_Name: string;
}
