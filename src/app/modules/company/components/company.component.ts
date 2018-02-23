// import { Component } from '@angular/core';  
// import { Router }    from '@angular/router'; 
// import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
// import { CompanyModel }  from '../models/company.model';
// import { PediturkApi } from '../../../pediturk-api'
// import { CompanyService } from '../services/company.service';
// import { UIService } from '../../shared/services/ui.service';
// import {FormGroup, NgForm} from '@angular/forms';

// @Component({
//  selector: 'company', 
//  templateUrl: '../templates/company.component.html'
// })

// export class CompanyComponent {
//   company: CompanyModel; 
//   private params;
//   private temp;
//   private headers = new HttpHeaders().set('Access-Control-Allow-Origin','*')
//                                      .set('Content-Type' ,'application/json'); 

//   constructor(private http: HttpClient, private router: Router, private companyService: CompanyService,private uiService: UIService) { 
//     this.company = new CompanyModel(); 
//     this.temp = JSON.parse(localStorage.getItem('currentUser'));
//     console.log("constructor called" );
//   }
 
//   errorMsg: string;
//   successMsg: string;
//   tmp :number; 

//       addCompany(form:FormGroup)
//       {
        
//         console.log("1" );  
//         if(form.invalid)
//         {
//           console.log("2" );  
//           form.disable;
//         }
//         console.log("addcomp req start"+ this.tmp);  
//          this.companyService.addCompnay(this.company).subscribe(data => {
//              // Read the result field from the JSON response.
//              console.log("post success"+ data.statusMessage + data.statusCode);
//              if(data.statusCode == "1"){ 
//                     this.uiService.alertSuccess("Company Added Successfuly");
//                     if(this.company.Logo != undefined)
//                           if(this.company.Logo.length >10)
//                                  this.uploadLogo(data.Result.id.toString());
//                 }
//              else{
//               this.uiService.alertError("Sorry, Something went wrong");
//                  }
//            }, 
//            err => {
//             this.uiService.alertError("Sorry, Something went wrong");
//            }, 
//            () => {
             
//            }
//          );
//       }
 
//       uploadLogo(compId:string)
//       {
//         console.log("upload logo token:"+this.temp.id);
//         this.successMsg = "Uploading Logo..."; 

//         this.params = new HttpParams()
//         .set('content_type', '.png')
//         .set('userID', this.temp.id); 
 
//          this.http.post<AddLogoResponse>(PediturkApi.uploadCompanyLogo+compId,this.company.Logo, {headers: this.headers,params: this.params}).subscribe(data => {
//              // Read the result field from the JSON response.
//              console.log("post success"+ data.statusMessage + data.statusCode);
//              if(data.statusCode == "1") 
//                 { 
//                      this.successMsg = "Logo Uploaded Successfuly"; 
//                 }
//              else
//                  {
//                      this.errorMsg = "Sorry, Logo Couldn't Be Uploaded"; 
//                  }
//            },
//                 // error callback
//            err => {
//                 this.errorMsg = "Sorry, Something went wrong"; 
//            }, 
//            () => {
             
//            }
//          );
//       }
// }



// export interface AddLogoResponse {
//   statusCode: string;
//   statusMessage: string;
//   Result: string;
// }
