import { Component,OnInit } from '@angular/core';
import {BranchModel} from '../models/branch.model';
import { CompanyService } from '../../company/services/company.service';
import { BranchService } from '../services/branch.service';
import { UIService } from '../../shared/services/ui.service';

declare var $ :any;

@Component({
 selector: 'branch-admin', 
 templateUrl:  '../templates/branch-admin.component.html'
})


export class  BranchAdminComponent {
    branch: BranchModel; 
    
  

    constructor( private companyService: CompanyService , private branchService: BranchService, private uiService: UIService) { 
      
        this.branch = new BranchModel(); 
      }
 successMsg:string;
 errorMsg:string;
 addBranch()
 {
    //  throw new Error('Im errorn');
  //  console.log("addcomp req start"+ this.tmp);
    
    this.branchService.addBranch(this.branch).subscribe(data => {
        // Read the result field from the JSON response.
        console.log("post success"+ data.statusMessage + data.statusCode);
        if(data.statusCode == "1"){ 
         this.uiService.alertSuccess("Branch added to company successfuly");
         
            //   this.successMsg = "Company Added Successfuly"; 
             
           }
        else{
         this.uiService.alertError("Sorry, Company Couldn't Be Added");
              // this.errorMsg = "Sorry, Company Couldn't Be Added"; 
            }
      }, 
      err => {
          
         this.uiService.alertError( "Sorry, Something went wrong");
        //   this.errorMsg = "Sorry, Something went wrong"; 
          //   throw new Error(err.message);
      }, 
      () => {
        
      }
    );

 }

   
  
  
 }

