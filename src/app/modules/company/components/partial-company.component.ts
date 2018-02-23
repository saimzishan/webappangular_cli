import { Component, Input , OnInit, OnChanges, DoCheck } from '@angular/core';
import { CompanyModel }  from '../models/company.model';
// import { TranslateService, TranslatePipe } from "ng2-translate/ng2-translate";
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UIService } from '../../shared/services/ui.service';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';
import { ViewChild } from '@angular/core/src/metadata/di';
 import { Form } from '@angular/forms';
import { from } from 'rxjs/observable/from';
import { errorMsgs } from './company-view.component';
import { COUNTRIES } from '../../shared/components/country';
import { CompanyService } from '../services/company.service';

export const STATUSES = [
    {'id': 1, 'value': 'Active'},
    {'id': 2, 'value': 'Inactive'},
    {'id': 3, 'value': 'Open'},
    {'id': 4, 'value': 'Closed'},
]
export const COMPANYTYPES = [
    {'id': 1, 'value': 'Type-1'},
    {'id': 2, 'value': 'Type-2'},
    {'id': 3, 'value': 'Type-3'}
];
export const SUBSCRIPTIONTYPES = [
    {'id': 1, 'value': 'Sub-Type-1'},
    {'id': 2, 'value': 'Sub-Type-2'},
    {'id': 3, 'value': 'Sub-Type-3'}
];

@Component({
 selector: 'partial-company',
 templateUrl: '../templates/partial-company.component.html',
 styles: [` .ng-valid[required], .ng-valid.required {
                border-color: #42A948; / green /
            }
            .ng-invalid:not(form) {
                border-color: #a94442; / red /
            }`],
 exportAs: 'partialCompanyForm'
})

export class PartialCompanyComponent implements OnInit {

    @Input()
    errors: errorMsgs;
   currentTabIndex = 0;    
    @Input()
    company: CompanyModel;
    @Input()
    isAdded: boolean;
    @Input()
    tabCheck: boolean=false;
    @Input()
    tab2Check: boolean=false;
    isMatch:boolean=true;
    isFill: boolean=true;
    latLng: string = '';
    isSave: boolean=false;
    countryList: any[];
    newTodo: string;
    todos: any;
    URL: any;
    links: any;
    todoObj: any;
    someError = false;
    statuses: any;
    subscriptionTypes: any;
    companyTypes: any;
    companies;
    emailAlReadyInUse;
    constructor( private uiService:UIService, private companyService: CompanyService) {
        this.company= new CompanyModel();
        this.countryList = COUNTRIES;
        this.newTodo = '';
        this.links;
        this.todos = [];
        this.URL = [];
        this.errors = new errorMsgs();
        this.currentTabIndex = 0;
        this.statuses = STATUSES;
        this.subscriptionTypes = SUBSCRIPTIONTYPES;
        this.companyTypes = COMPANYTYPES;

      }

      ngOnInit(){
          this.getAllCompanies();
    }

    
    testting() {
         
    }
      onLinkClick(event) {
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
        if (
            this.company.Company_Name === '' ||
            this.company.Company_Type == undefined ||
            this.company.Company_Admin_Email === '' ||
            this.company.Branch_Admin_Email === '' ||
            this.company.Admin_Password === '' ||
            this.company.confirmPassword === '' ||
            this.company.Max_Allowed_Branches == 0 ||
            this.company.City === '' ||
            this.company.Status == undefined
        ) {
            this.company.currentTabIndex = 0;

            this.errors.Company_Name = true;
            this.errors.Company_Type = true;
            this.errors.Company_Admin_Email = true;
            this.errors.Admin_Password = true;
            this.errors.City = true;
            this.errors.Status = true;
            this.errors.Max_Allowed_Branches = true;
        } else if (
            this.company.Location === '' ||
            this.company.Country === '' ||
            this.company.Building_No == 0 ||
            this.company.Town === '' ||
            this.company.Street === ''
        ) {
            if (event.index === 0) {
                this.company.currentTabIndex = 0;
            } else {
                this.company.currentTabIndex = 1;

                this.errors.Location = true;
                this.errors.Country = true;
                this.errors.Building_No = true;
                this.errors.Town = true;
                this.errors.Street = true;
            }
        } else if (
            this.company.Contact_Person === '' ||
            this.company.Contact_Person_Email === '' ||
            this.company.Landline_No === '' ||
            this.company.Mobile_No === ''
        ) {
            if (event.index === 0) {
                this.company.currentTabIndex = 0;
            } else if (event.index === 1) {
                this.company.currentTabIndex = 1;
            } else {
                this.currentTabIndex = 2;

                this.errors.Contact_Person = true;
                this.errors.Contact_Person_Email = true;
                this.errors.Landline_No = true;
                this.errors.Mobile_No = true;
            }
        } else {
            if (event.index === 0 || event.index === 1 || event.index === 2) {
                this.company.currentTabIndex = event.index;
                return;
              }
              if (event === 0 || event === 1) {
                this.company.currentTabIndex = event + 1;
                return;
              }
            this.isSave = true;
        }
        if (this.company.currentTabIndex == 0) {
            this.isFill = true;
            //this.currentTabIndex = 1;
          } else if (this.company.currentTabIndex == 1) {
            this.isFill = true;
          } else {
            this.isFill = false;
          }
    }
    checkCompNameAlReady(id) {
        for (let i = 0; i < this.companies.length; i++) {
            // console.log(this.companies[i].companyData.Company_Name);
            if (id !=  this.companies[i].companyData.id) {
                let d1 = this.companies[i].companyData.Company_Name.toUpperCase();
                let d2 = this.company.Company_Name.toUpperCase();
                if (d1  === d2) {
                    return false;
                }
            } 
        }
        return true;
    }
    checkEmailAlready(id) {
        this.emailAlReadyInUse = false;
        for (let i = 0; i < this.companies.length; i++ ) {
            if (id !=  this.companies[i].companyData.id) {
                let d1 = this.companies[i].companyData.Email.toUpperCase();
                let d2 = this.company.Company_Admin_Email.toUpperCase();
                let d3 = this.company.Branch_Admin_Email.toUpperCase(); 
                if( d1 === d2 || 
                    d1 === d3  ) {
                return true;
                }
            }
          // console.log(this.branches[i].BranchData);
        }
        return false;
      }

    //for logo upload
    handleFileSelect(evt){
        var files = evt.target.files;
        var file = files[0];

      if (files && file) {
          var reader = new FileReader();

          reader.onload =this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
      }
    }

    onMapClick(event){
        this.latLng=event.latLng;
        this.latLng=this.latLng.toString();
        this.latLng=this.latLng.replace("(","");
        this.latLng=this.latLng.replace(")","");
        this.latLng=this.latLng.trim();
        //this.lng=event.lng;

    }
    setMapLngLat(){
        this.company.Location=this.latLng;
    }

    confirmPass() {
        if ( this.company.confirmPassword == this.company.Admin_Password )
        {
            this.isMatch=true;
        }else{
            this.isMatch=false;
        }
    }
    testingModeON(e) { 
        this.company.checkboxFalse = e.target.checked;
        let date = new Date();
        let  somedate = date.toISOString().substring(18, 23);
        if (e.target.checked) { 
            this.company.Company_Name = somedate + 'Test name';
            this.company.URL = 'https://www.test.com';
            this.company.Address = 'Test adress';
            this.company.ContactNumber = '123456789';
            this.company.Company_Type = 1;
            this.company.Company_Admin_Email = somedate + 'test@test.com'; 
            this.company.Branch_Admin_Email = somedate + 'branch@test.com';
            this.company.Admin_Password = '123';
            this.company.User_Role = 18;
            this.company.confirmPassword = '123';
            this.company.Company_Owner = 0;
            this.company.selected = '1';
            this.company.SubscriptionID = 1;
            this.company.Software_Services_Level = 0;
            this.company.Main_Branch = 1;
            this.company.Max_Allowed_Branches =10;
            this.company.Status = 123;
            this.company.Country = 'AF';
            this.company.City = 'Test City';
            this.company.Town = 'Test Town';
            this.company.Street = 'Test street';
            this.company.Building_No = 10;
            this.company.Mobile_No  = '123456';
            this.company.Landline_No = '12345';
            this.company.Location = '38.53097889440024, 35.51227569';
            this.company.Contact_Person_Email = somedate + 'test@person.com';
            this.company.Contact_Person = 'Test person';
            this.company.Company_Website = 'https://www.test.com';
        } else {
            this.company = new CompanyModel();
        }
    }
    confirmPassword() {
        this.company.confirmPassword = '';
    }
    getAllCompanies() {
        // console.log("get all companies from view start");
 
         this.companyService.getCompanies().subscribe(data => {
             //     console.log("get all companies success" + data.statusMessage + data.statusCode);
             if (data.statusCode == "1") {
                 this.companies = data.Result;
                 console.log(this.companies);
             }
             else {
                 this.uiService.alertError(data.statusMessage);
             }
         });
         //console.log("comp:::"+JSON.stringify(this.companies));
     }

    _handleReaderLoaded(readerEvt) {
       var binaryString = readerEvt.target.result;
              this.company.Logo= btoa(binaryString);
      }

      addTodo(event) {
        //console.log("todo");
        this.todoObj = {
          newTodo: this.newTodo,
          completed: false
        }
        this.todos.push(this.todoObj);

        this.company.SocialMediaLinks.push(this.newTodo);
        //console.log(this.company.SocialMediaLinks);
        
        this.links={
            URL: this.URL
        }
        this.newTodo = '';
        event.preventDefault();
      }

      setMediaIDs(SocialMediaLinks){
        this.company.SocialMediaLinks= [];
        this.todos = [];
          // console.log("Partial-comp-IDs::"+JSON.stringify(this.company.SocialMediaLinks));
        if(this.company.SocialMediaLinks.length > 0){
            //console.log("Partial-comp-ID-if::"+JSON.stringify(this.company.SocialMediaLinks));
            for(var i=0; i<SocialMediaLinks.length; i++){
                this.todoObj = {
                    newTodo: SocialMediaLinks[i].URL,
                    completed: false
                }
                this.company.SocialMediaLinks.push(SocialMediaLinks[i].URL);
                this.todos.push(this.todoObj);
                this.URL.push(this.todoObj.newTodo);
                this.links={
                    URL: this.URL
                }
            }

            console.log(this.todos);
        }
        // alert('r');
      }

      deleteTodo(index) {
        this.todos.splice(index, 1);
        this.URL.splice(index, 1);
      }

   public checkError(errorMsgs){
        //this.onLinkClick();
       this.errors = errorMsgs;
       this.someError = true;
    
       //alert(this.someError);
       // console.log('Working'+JSON.stringify(this.errors));
    }
}

export interface Companyvalues
{
    id:string;
    name:string;
}
