import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { EntryService } from '../services/entry.service'
import { SignupModel } from '../models/signup.model';

import { CompanyService } from '../../company/services/company.service';
import { BranchService } from '../../branch/services/branch.service';
declare var $: any;

@Component({
    selector: 'signup',
    templateUrl: '../templates/signup.component.html'
})

export class SignupComponent implements OnInit {
    signupModel: SignupModel;
    companies: Result[];
    branches: Result[];
    constructor(private http: HttpClient, private router: Router, private entryService: EntryService, private companyService: CompanyService, private branchService: BranchService) {
        this.signupModel = new SignupModel();
    }

    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/json');




    ngOnInit(): void {
        this.getAllCompanies();
        this.getAllBranches();
    }

    errMessage: string;
    successMsg: string;
    signUp() {
        console.log("signup req start");

        this.entryService.signUp(this.signupModel).subscribe(data => {

            console.log("post success" + data.statusMessage + data.statusCode);
            if (data.statusCode == "1") {
                this.errMessage = "Account Created Successfuly";
            }
            else {
                this.errMessage = data.statusMessage;
            }
        },
            err => {
                this.errMessage = "Sorry, Something went wrong";
            },
            () => {

            }
        );

    }

    getAllCompanies() {
        console.log("get all companies start");

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
                this.errMessage = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errMessage = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }   // temp2;
    tempBranches;

    getAllBranches() {
      console.log("get all branches start");
      
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
              this.errMessage = "Sorry, Something went wrong"; 
          }
      }, 
       err => {
              this.errMessage = "Sorry, Something went wrong"; 
          },
          () => {
                   
          }
      );
  }

    companyID: string;
    companyName: string;
    companynameandid: string[];
    filteredBranches;

    public selectedComp(value: any): void {

        console.log('Selected value is: ', value);

        this.companyID = value.id;
        console.log('id: ', this.companyID);
        this.companyName = value.text;
        console.log('company name: ', this.companyName);
        this.branches = null;
        //binding company id

        this.signupModel.Company_ID = +this.companyID;
        console.log('company : ', this.signupModel.Company_ID);
        this.signupModel.Branch_ID = null;
        this.filteredBranches=  this.tempBranches.filter(tempBranch => tempBranch.company_ID== value.id);

        this.branches = this.filteredBranches.map(function (a) {
                                return {
                                    text: a.Name,
                                    id: a.id

                                };
                            });


        //  this.initTable();
    }

    public removedComp(value: any): void {

        console.log('removed ', JSON.stringify(this.branches));
        this.branches = null;
        this.branches = this.tempBranches;
        // this.initTable();
    }

    branchid
    public selectedBranchEnt(value: any): void {
        this.branchid = value.id;
        this.signupModel.Branch_ID = this.branchid;
        console.log('branch : ', this.signupModel.Branch_ID);
    }

    public removedBranchDepEnt(value: any): void {

        console.log('removed ', JSON.stringify(this.branches));
        this.branches = null;
        this.branches = this.tempBranches;
        //  this.initTable();
    }

}
export interface Result {
    id: number;
    text: string;
}