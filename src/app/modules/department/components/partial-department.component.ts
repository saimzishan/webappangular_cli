import { Component, Input , OnInit, OnChanges } from '@angular/core';  
import { DepartmentModel }  from '../models/department.model';
import { CompanyService } from '../../company/services/company.service';
import { BranchService } from '../../branch/services/branch.service';
import {BranchViewResponse } from '../../branch/models/branch-view-response.model';
 
declare var $ :any;
@Component({
 selector: 'partial-department', 
 templateUrl: '../templates/partial-department.component.html'
})


export class PartialDepartmentComponent implements OnInit, OnChanges{

  companies: Result[]=[];
  branches: Result[]=[];
  company: Result = { "text": 'Select Company', "id": 0 };
  branch: Result = { "text": 'Select Branch', "id": 0 };
    @Input() department: DepartmentModel ;
    @Input() isEdit: boolean=false;
    constructor( private companyService: CompanyService, private branchService: BranchService) { 
        //this.setDepartment();
        console.log("construct call:::");
        }
        
        // isEditCall(event) {
        //     if(event){
        //         this.setDepartment();
        //     }
        // }
        // if(isEdit){
        //     this.setDepartment();
        // }
        ngOnChanges(): void{
            if(this.isEdit){
                this.setDepartment();
                //console.log("partial ng called:")
              }
            //console.log("changes call");
        }

        ngOnInit(): void {
                  this.getAllBranches();
                  this.getAllCompanies();
                  if(this.isEdit){
                    this.setDepartment();
                    console.log("partial ng called:")
                  }
                  // console.log("partial ng called1:"+this.isEdit);
                 }
            
                 errorMsg: string;
                 successMsg: string;
                 getAllCompanies(){
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
               // temp2;
                tempBranches;

                getAllBranches() {
                  // console.log("get all branches start");
                  
                  this.branchService.getBranches().subscribe(data => { 
                       if (data.statusCode == "1") {
                        this.tempBranches= data.Result;
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
           
              initTable() {   
                $("#tblDepartmentData").DataTable();  
       }
    
         changeBranch(dep:DepartmentModel){
          this.department = dep;
          this.branch.id=dep.BranchID;
          this.company.id=dep.CompanyID;
    }   
companyID:string;
companyName:string;
companynameandid: string[];
filteredBranches;

public selectedCompany(value:any):void {
   
    // console.log('Selected value is: ', value);

    this.companyID = value.id;
    console.log('id: ',   this.companyID );
    this.companyName=value.text;
    console.log('company name: ',   this.companyName );
    this.branches=null;
    //binding company id
    
    this.department.CompanyID=+this.companyID ;
    console.log('company : ',   this.department.CompanyID );

    this.filteredBranches=  this.tempBranches.filter(tempBranch => tempBranch.company_ID== value.id);
    
    //console.log('branches ',JSON.stringify(this.filteredBranches)  );

    this.branches = this.filteredBranches.map(function (a) {
                            return {
                                text: a.Name,
                                id: a.id
                               
                            };
                        });
                        
                        
    //  this.initTable();
  }

  setDepartment(): void{
    this.company = this.companies.filter(result => result.id == this.department.CompanyID)[0];
    this.branch = this.branches.filter(result => result.id == this.department.BranchID)[0];
    //console.log("branchh->"+this.company.text);
  }

  public removedCompany(value:any):void {

    console.log('removed ',JSON.stringify(this.branches)  );
    this.branches=null;
    this.branches=this.tempBranches;
    this.initTable();
  }

  branchid
  public selectedBranchDep(value:any) :void 
  {
    this.branchid=value.id;
    this.department.BranchID=this.branchid;
    console.log('branch : ',   this.department.BranchID );
  }

  public removedBranchDep(value:any):void {
    
        // console.log('removed ', JSON.stringify(this.branches)  );
        this.branches=null;
        this.branches=this.tempBranches;
        this.initTable();
      }

}


export interface  Result {
    id: number;
    text: string;
   
  
  }