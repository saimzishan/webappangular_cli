import { Component, Input, OnInit, DoCheck, ViewChild } from '@angular/core';
import { BranchModel } from '../models/branch.model';
import { BranchService } from '../services/branch.service';
import { BranchViewResponse } from '../models/branch-view-response.model';
import { UIService } from '../../shared/services/ui.service';
import { Location } from '@angular/common';

import { CompanyService } from '../../company/services/company.service';
import { forEach } from '@angular/router/src/utils/collection';
import { concat } from 'rxjs/operator/concat';
import { CompanyModel } from '../../company/models/company.model';
import { PartialCompanyComponent } from '../../company/components/partial-company.component';
import { PartialBranchComponent } from './partial-branch.component';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { STATUSES } from './partial-branch.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'branch-view',
  templateUrl: '../templates/branch-view.component.html',
})

export class BranchViewComponent implements OnInit, DoCheck {
  lat: number[];//=41.015137;
  lng: number[];//=28.979530;
  positions: string[] = [];//=["38.42, 31.11","40.93, 33.85","41.01125235884344, 28.9715775847435"];
  branchCount: number;
  isTabFill: boolean = true;
  isTab2Fill: boolean = true;
  selectedBranch: any;
  private companyId = JSON.parse(localStorage.getItem('Company_ID'));
  private maxAllowBranches: number = JSON.parse(localStorage.getItem('Max_Allowed_Branches'));
  companies: Result[];
  temp: BranchViewResponse[]

  statuses: any;
  public mesg = new ErrorMsgs();
  branches: any;
  private tempe = JSON.parse(localStorage.getItem('currentUser'));
  public isSave = false;
  errorMsg: string;
  successMsg: string;
  checkedBox: boolean = false;
  isFill: boolean;
  firstNext: boolean;
  secondNext: boolean;
  branch: BranchModel;
  newBrabcnDataArray = [];
  currentTabIndex = 0;
  tempData: any;
  tempDataID: any;
  public validationError = false;
  isSaveneCheck;
  testCheckBox;
  @ViewChild(PartialBranchComponent)  partialBranch: PartialBranchComponent;
  @ViewChild('partialBranchForm')  partialBranchForm: PartialBranchComponent;
  
  constructor(private location: Location, private router: Router, private branchService: BranchService, private uiService: UIService, private companyService: CompanyService) {
    this.branch = new BranchModel();
    this.firstNext = true;
    this.secondNext = true;
    this.statuses = STATUSES;
    this.newBrabcnDataArray = [];
  }
  ngOnInit(): void {
    this.getBranchesAgainstComapnyID();
    this.drawMap();
    this.viewData();
  }

  ngDoCheck() {
    if(this.branch.Name==='') {
        this.firstNext = true;
        this.isTabFill = true;
        this.isTab2Fill = true;
    }else if (this.branch.branch_Admin_Email==='') {
        this.firstNext = true;
        this.isTabFill = true;
        this.isTab2Fill = true;
    }else if (this.branch.Admin_Password==='') {
        this.firstNext = true;
        this.isTabFill = true;
        this.isTab2Fill = true;
    }else if (this.branch.confirmPassword==='') {
        this.firstNext = true;
        this.isTabFill = true;
        this.isTab2Fill = true;
    }else if (this.branch.Status==undefined) {
        this.firstNext = true;
        this.isTabFill = true;
        this.isTab2Fill = true;
    }else if (this.branch.Location==='') {
        this.firstNext = false;
        this.isTabFill = false;
        this.isTab2Fill = true;
    }else if (this.branch.Country==='') {
        this.firstNext = false;
        this.isTabFill = false;
        this.isTab2Fill = true;
    }else if (this.branch.Building_No==0) {
        this.firstNext = false;
        this.isTabFill = false;
        this.isTab2Fill = true;
    }else if (this.branch.City==='') {
        this.firstNext = false;
        this.isTabFill = false;
        this.isTab2Fill = true;
    }else{
        this.firstNext = false;
        this.isTabFill = false;
        this.isTab2Fill = false;             
    }
}
setNewData() {
  this.partialBranch.branch = new BranchModel();
  this.partialBranch.currentTabIndex = 0;
  this.partialBranch.branchServices = [];
  this.testCheckBox = false;
  this.partialBranch.setNewDataWhen();
 this.newBrabcnDataArray = [];
}
testingModeON(e) {
  this.testCheckBox = e.target.checked;
  let date = new Date();
   let  somedate = date.toISOString().substring(18, 23);
  if (e.target.checked) {
    this.branch.Branch_Type = '1';
    this.branch.Name = somedate + 'Test Name';
    this.branch.Country = 'Afghanistan';
    this.branch.City = 'Kabul';
    this.branch.Town = 'Test Town';
    this.branch.Street = 'Test Street';
    this.branch.Building_No = 1234;
    this.branch.Location = '38.81403111409755, 28.09427261';
    this.branch.Contact_Person =  'Test person';
    this.branch.Telephone = 123456789;
    this.branch.branch_Admin_Email = somedate + 'Test@test.com';
    this.branch.Admin_Password = '123';
    this.branch.confirmPassword = '123';
    this.branch.Number = '123456789';
    //this landline is extra
    this.branch.Landline_Number = '123456789';
    this.branch.Fax_Number = '123456789';
    this.branch.Branch_Email_address = somedate + 'test@test.com';
    this.branch.Branch_Website = 'http://www.test.com';
    this.branch.selected = '1';
    this.branch.Status = 1;
    this.branch.Manager = '123456789';
    this.branch.Capabilities = '123456789' ;
    this.branch.Branch_Data_Access_Permissions = 'abcTest';
    this.branch.Branch_Data_Sharing_Permissions = 'abcTest';
  } else {
    this.branch = new BranchModel();
  }
}
clearOldData() {
  // alert('now');
  this.partialBranch.setNewDataWhen();
}
checkAll() {
    this.checkedBox = !this.checkedBox;
  }

  getBranchesAgainstComapnyID() {
    // console.log("Max:::"+this.maxAllowBranches);

    this.branchService.getBranchesAgainstCompanyID(this.companyId).subscribe(data => {
      if (data.statusCode == "1") {
        this.branches = data.Result;
        // console.log(this.branches);
        this.branchCount = data.Result.length;
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
  getAllCompanies() {
   // console.log("get all companies start");

    this.companyService.getCompanies().subscribe(data => {
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

  getAllBranches() {
   //  console.log("get all branches start");

    this.branchService.getBranches().subscribe(data => {
      if (data.statusCode == "1") {
        this.branches = data.Result;
        //this.temp = data.Result;
        this.branchCount = data.Result.length;
        // console.log("length:"+data.Result.length);
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

  viewData(): void {
    $('#countryMap').hide();
    $('#clinicsData').show('slide', { direction: 'right' }, 1000);
    $('#btnViewData').hide();
    $('#btnViewMap').show();
  }

  viewMap(): void {
    this.getBranchOnMap();
    $('#clinicsData').hide();
    $('#countryMap').show('slide', { direction: 'left' }, 1000);
    $('#btnViewMap').hide();
    $('#btnViewData').show();
  }

  drawMap(): void {
    $("#clinicsData").hide();
    $("#btnViewMap").hide();
  }

  getBranchOnMap(): void {
    //this.positions=["39.84, 32.76","40.93, 33.85","40.93, 33.85"]
    for (var i = 0; i < this.branchCount; i++) {
      this.positions[i] = this.branches[i].BranchData.Location;
      //console.log("Index of branch:" + JSON.stringify(this.positions[i]));
    }
  }

  checkCompanyAlready(id) {
    for (let i = 0; i < this.branches.length; i++ ) {
      if (id != this.branches[i].BranchData.id) {
        if( this.branches[i].BranchData.Name == this.branch.Name ) {
          return true;
      }
    }
    }
    return false;
  }
  checkEmailAlready(id) {
    for (let i = 0; i < this.branches.length; i++ ) {
      if (id != this.branches[i].BranchData.id) {
        if( this.branches[i].BranchData.Email === this.branch.branch_Admin_Email ) {
          return true;
        }
      }
    }
    return false;
  }
  doCheck() {
    if(this.checkCompanyAlready(this.branch.id)) {
      this.uiService.alertError ('This Name of Branch Already in Use, Please use another name..' ) ;
      this.branch.Name = '';
    }
    if (this.checkEmailAlready(this.branch.id)) {
      this.uiService.alertError ('This Email Already in Use, Please use another Email..' ) ;
      this.branch.branch_Admin_Email = '';    
    }
    this.isSave = true;
    if (this.branch.Name === '') {
      this.mesg.Branch_Name = true;
      this.isSave = false;
    } else {
      this.mesg.Branch_Name = false;
    }
    if (this.branch.City === '') {
      this.mesg.City = true;
      this.isSave = false;
    } else {
      this.mesg.City = false;
    }
    if (this.branch.branch_Admin_Email === '') {
      this.mesg.branch_Admin_Email = true;
      this.isSave = false;
    } else {
      this.mesg.branch_Admin_Email = false;
    }

    if (this.branch.Admin_Password === '') {
      this.mesg.Admin_Password = true;
      this.isSave = false;
    } else {
      this.mesg.Admin_Password = false;
    }
    if (this.branch.Contact_Person === '') {
      this.mesg.contact_Person = true;
      this.isSave = false;
    } else {
      this.mesg.contact_Person = false;
    }
    if (this.branch.Location === '') {
      this.mesg.Location = true;
      this.isSave = false;
    } else {
      this.mesg.Location = false;
    }
    if (this.branch.Country === '') {
      this.mesg.Country = true;
      this.isSave = false;
    } else {
      this.mesg.Country = false;
    }
    if (this.branch.Status == undefined) {
      this.mesg.Status = true;
      this.isSave = false;
    } else {
      this.mesg.Status = false;
    }
    if (this.branch.Building_No == 0) {
      this.mesg.Building_No = true;
      this.isSave = false;
    } else {
      this.mesg.Building_No = false;
    }
    this.partialBranchForm.checkError(this.mesg);
  }

  newBranch() {
    this.branch = new BranchModel();
    this.mesg = new ErrorMsgs();
    this.partialBranchForm.isFill = true;
  }

  addBranch() {
    this.doCheck();
    if (this.isSave) {   
      if(this.branchCount < this.maxAllowBranches){
        this.branchService.addBranch(this.branch).subscribe(data => {
          if (data.statusCode == "1") {     
            this.isSave = true;
            this.uiService.alertSuccess("Branch added to company successfuly");
            this.ngOnInit();    
          } else {
            this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
          }
        },
          err => {
            this.isSave = false;
            this.uiService.alertError(err.statusMessage + ':' + err.Result);
          });
      } else {
        this.uiService.alertError('Cannot Create Branch, Your Branch Creation Limit Exceeded!');        
      }
    } else {
      // alert(this.isSave);
    }
  }
  getBranchesAgainstBranchID () {
    this.branchService.getBranchesAgainstBranchID(this.tempDataID).subscribe(data => {
      if (data.statusCode == "1") {
        this.tempData = data.Result;
      }
        else {
          this.uiService.alertInfo('No changes were detected');
     } 
    } );
  }
  detectChanges() {
    let c = 0;
       if(
         this.tempData.Name != this.branch.Name ||
         this.tempData.Branch_Type != this.branch.Branch_Type ||
         this.tempData.Country != this.branch.Country ||
         this.tempData.City != this.branch.City ||
         this.tempData.Town != this.branch.Town ||
         this.tempData.Street != this.branch.Street ||
         this.tempData.Building_No != this.branch.Building_No ||
         this.tempData.Location != this.branch.Location ||
         this.tempData.Contact_Person != this.branch.Contact_Person ||
         this.tempData.Telephone != this.branch.Telephone ||
         this.tempData.Number != this.branch.Number ||
         this.tempData.Landline_Number != this.branch.Landline_Number ||
         this.tempData.Fax_Number != this.branch.Fax_Number ||
         this.tempData.Branch_Email_address != this.branch.Branch_Email_address ||
         this.tempData.Branch_Website != this.branch.Branch_Website ||
         this.tempData.Status != this.branch.Status ||
         this.tempData.Capabilities != this.branch.Capabilities ||
         this.tempData.Branch_Data_Access_Permissions != this.branch.Branch_Data_Access_Permissions ||
         this.partialBranch.branchDeparmentIN === true || this.partialBranch.branchSocialIN == true ||
         this.tempData.Branch_Data_Sharing_Permissions != this.branch.Branch_Data_Sharing_Permissions) { 
      } else {
        this.uiService.alertInfo('No changes were detected');
        c = 1;
      }
     return c; 
    }
    // if(this.tempData.BranchData.Name != this.branch.Name) {
    //   alert('wow');
    // }
  editBranch() {
    this.doCheck();
    let temp = this.detectChanges();
    if (temp === 1) {
      this.isSave = false;
      return;
    }
    this.branchService.editBranch(this.branch).subscribe(data => {
      if (data.statusCode == "1") {
        this.ngOnInit();
        this.uiService.alertSuccess("Branch Updated Successfuly");
      }
      else {
        this.uiService.alertError('Some thing went wrong');
      }
    },
  
      err => {

        this.uiService.alertError(err.statusMessage + ':' + err.Result);
      });
  
  }

  deleteBranch() {

    this.errorMsg = "";
    this.successMsg = "";
    this.selectedBranch = this.branches.filter(_ => _.selected);
    //console.log("selected branch:" + JSON.stringify(this.selectedBranch));
    for (var branch in this.selectedBranch) {
    // console.log("selected branch:" + JSON.stringify(branch));
      
      this.branchService.deleteBranch(this.selectedBranch[branch].BranchData.id).subscribe(data => {
        console.log("delete by id" + data.statusMessage + data.statusCode);
        if (data.statusCode == "1") {

          this.getBranchesAgainstComapnyID();
          //this.router.navigate(['/branch/view']);
          //console.log("check id" + id);
          this.uiService.alertSuccess("Branch Deleted Successfuly");
          // this.branches = this.branches.filter(h => h.id !== Number.parseInt(id));
          this.initTableBranch();
        } else {
          this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
        }
      },
        // error callback
        err => {
          this.uiService.alertError(err.statusMessage + ':' + err.Result);
        });
    }
  }

  initTableBranch() {
    // console.log("asda");
    $("#tblBranchData").DataTable({
      retrieve: true,
      order: [0, 'desc']
    });
  }

  changeBranch(branch: any) {
    this.tempDataID = branch.BranchData.id;
    this.branch = branch.BranchData;
    this.branch.newTabIndex = 0;
    this.branch.SocialMediaLinks = [];
    this.branch.DepartmentID   = [];
    this.getBranchesAgainstBranchID();
    this.partialBranch.branchDeparmentIN = false;
    this.partialBranch.branchSocialIN = false;
    this.partialBranch.setMediaIDs(branch.SocialMediaData, branch.BranchData.id);
    this.mesg = new ErrorMsgs();
    this.partialBranchForm.isFill = true;
  }

  companyID: string;
  companyName: string;
  companynameandid: string[];

  public selectedComp(value: any): void {

    // console.log('Selected value is: ', value);

    this.companyID = value.id;
    // console.log('id: ', this.companyID);
    this.companyName = value.text;
    // console.log('company name: ', this.companyName);
    this.branches = null;
    this.branches = this.temp.filter(tempcompany => tempcompany.company_ID == Number.parseInt(value.id));
    // console.log('companies: ', JSON.stringify(this.branches) + " gf " + JSON.stringify(this.temp));
    this.initTableBranch();
  }

  public removedComp(value: any): void {

    // console.log('removed ', JSON.stringify(this.branches));
    this.branches = null;
    this.branches = this.temp;
    this.initTableBranch();
  }

  findStatus(value: number):string{
    for (var status of this.statuses){
      if(status.id == value){
        return status.value;
      }
    }
  }

}

export interface Result {
  id: number;
  text: string;
}

export class ErrorMsgs {
  Branch_Name = false;
  branch_Admin_Email = false;
  Admin_Password = false;
  contact_Person = false;
  City = false;
  Status = false;
  Location = false;
  Country = false;
  Building_No = false;
  /* Location: boolean= false;
   Country: boolean= false;
   Building_No: boolean= false;
   Town: boolean= false;
   Street: boolean= false;
   Contact_Person: boolean= false;
   Contact_Person_Email: boolean= false;
   Landline_No: boolean= false;
   Mobile_No: boolean= false;
 */
}
