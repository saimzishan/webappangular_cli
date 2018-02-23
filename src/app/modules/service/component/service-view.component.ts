import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { ServiceModel, BranchSertviceModel } from '../models/service.model';
import { ServiceService } from '../services/service.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'service-view',
    templateUrl: '../templates/service-view.component.html'
})


export class ServiceViewComponent implements OnInit {

    
    private temp = JSON.parse(localStorage.getItem('currentUser'));
    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json')
        .set('Authorization', this.temp.token);

    errorMsg: string;
    successMsg: string;
    isMovedLeft: boolean;
    isMovedRight: boolean;
    companyId: any;
    branchId: any; 
    service: ServiceModel;
    tempService: any;
    branchService: any;
    categoryList: any;
    services: any[] = [];
    tempServices: any;
    branchServices: any[] = [];    
    constructor(private http: HttpClient, private router: Router, private serviceService: ServiceService, private uiService: UIService) {
        this.service = new ServiceModel();
        this.isMovedLeft = false;
        this.isMovedRight = true;
        this.companyId = localStorage.getItem('Company_ID');
        this.branchId = localStorage.getItem('Branch_ID'); 
    }
    ngOnInit(): void {
        this.getServiceListOfCompany();
        this.getServiceCategoriesOfCompany();
        this.getAllBranchAndServices();
    }

    getAllServices() {
       // console.log("get all service start");

        this.serviceService.getAllService().subscribe(data => {
            if (data.statusCode == "1") {
                //yahan respose ka modle use kena
                  this.services = data.Result;
                 // console.log(this.services);
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
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

    pushToBranch(){
        let arr: any[] = [];
        for (let ser of this.services){
            if(ser.isSelected == true){
                ser.isSelected = false;
                ser.ServiceID = ser.id;
                this.branchServices.push(ser);
                arr.push(ser);   
            }
            if(this.isMovedLeft == true || this.isMovedRight == true && this.branchServices.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;
            }
        }
        for (let val of arr){
            let index = this.services.indexOf(val);
            this.services.splice(index,1);
        }
       // console.log(this.branchServices);
    }

    pushBackToService(){
        let arr: any[] = [];        
        for (let ser of this.branchServices){
            if(ser.isSelected == true){
                ser.isSelected = false;                
                this.services.push(ser);
                arr.push(ser);                  
            }
            if(this.isMovedLeft == true  || this.isMovedRight == true && this.services.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;                
            }           
        }
        for (let val of arr){
            let index = this.branchServices.indexOf(val);
            this.branchServices.splice(index,1);
        }
    }

    pushAllToBranch(){
        for (let ser of this.services){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.branchServices.push(ser);
        }
        this.services =[];
        this.isMovedLeft = true;
        this.isMovedRight = false;
    }

    pushAllBackToService(){
        for (let ser of this.branchServices){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.services.push(ser);
        }
        this.branchServices = [];
        this.isMovedLeft = false;
        this.isMovedRight = true;        
    }
    addServicesToBranch() {
        this.branchService = new BranchSertviceModel();
        this.branchService.BranchID = this.branchId;        
        for(let d of this.branchServices){
            this.branchService.ServiceID.push(d.ServiceID);
        }
       // console.log(this.branchService);
        this.serviceService.createServiceToBranch(this.branchService).subscribe(data => {
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Services Assigned Successfuly");
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

    initTable() {
        $("#tblServiceData").DataTable();
    }

    getServiceListOfCompany() {
        this.serviceService.getServicesOfCompany(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.services = data.Result;
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
                this.branchServices = data.Result;
                for (let row of this.branchServices) {
                    for (let i = 0; i < this.services.length; i++ ) {
                        if (row.ServiceID === this.services[i].id) {
                            // console.log(row, this.departments[i]) service_CatID
                            row.Service_Name = this.services[i].Service_Name;
                            row.ServiceID = this.services[i].id;
                            row.service_CatID = this.services[i].service_CatID;
                            row.alReadyUploaded = true;
                            this.services.splice(i, 1);
                            // console.log(this.branchServices[i]);
                        }
                    }
                }
                console.log(this.branchServices);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    getServiceCategoriesOfCompany(){
        this.serviceService.readCategoriesOfCompany(this.companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.categoryList = data.Result;
               // console.log(this.categoryList);
            }
            else {
                this.uiService.alertError(data.statusMessage + ':' + JSON.stringify(data.Result));
            }
        });
    }

    deleteServices(id: string) {

        this.errorMsg = "";
        this.successMsg = "";
        //console.log("departmments",id+"");
        this.serviceService.deleteService(id).subscribe(data => {
            
        //console.log("departmments",id+"");
            console.log("delete by id" + data.statusMessage + data.statusCode);
            if (data.statusCode == "0") {
                this.uiService.alertSuccess("Service Deleted Successfuly");

                this.services = this.services.filter(h => h.id !== Number.parseInt(id));
                this.initTable();
            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            // error callback
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }


    editService() {

        this.errorMsg = "";
        this.successMsg = "";
        this.serviceService.editService(this.service).subscribe(data => {
            if (data.statusCode == "1") {

                this.uiService.alertSuccess("Service Updated Successfuly");

            }
            else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            // error callback
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }



    changeService(dep: ServiceModel) {
        this.service = dep;
    }

    // addService(){
    //  //  throw new Error('Im errorn');
    // //  console.log("addcomp req start"+ this.tmp);
       
    //    this.serviceService.addService(this.service).subscribe(data => {
    //        // Read the result field from thae JSON response.
    //        console.log("post success"+ data.statusMessage + data.statusCode);

    //        if(data.statusCode == "1"){ 
    //         console.log("stautus code 1");
            
    //         this.uiService.alertSuccess("Service Added Successfuly"); 
    //         if(this.service.templogo != undefined)
    //         if(this.service.templogo.length >10) 
    //                this.uploadLogo(data.Result.id.toString());
                  
    //           }
    //        else{
    //         this.uiService.alertError("Sorry, Something went wrong");
    //            }
    //      }, 
    //      err => {
    //       this.uiService.alertError("Sorry, Something went wrong");
    //      }, 
    //      () => {
           
    //      }
    //    );
    // }

//     uploadLogo(serId:string)
//     {
//       console.log("upload thumbnail req");
//       this.successMsg = "Uploading thumbnail..."; 

//       this.headers = new HttpHeaders().set('Authorization', this.temp.token); 

//       this.params = new HttpParams().set('content_type', '.png').set('userID',this.temp.id); 
//      // this.uiService.alertSuccess(this.temp.id+"");
      
//      console.log(" TOKEN :"+ this.temp.token);

//   //      this.service.Thumbnail=this.service.templogo;
        
//     //    console.log("thumbnail  : "+this.service.Thumbnail);
//        this.http.post<AddThumbnailResponse>(PediturkApi.uploadThumbnail+serId,this.service.templogo,{headers: this.headers,params: this.params}).subscribe(data => {
//            // Read the result field from the JSON response.
//            console.log("post success"+ data.statusMessage + data.statusCode+this.temp.id);
//            if(data.statusCode == "1") 
//               { 
//                   this.uiService.alertSuccess("thumbnail Uploaded Successfuly");
//                   // this.successMsg = "thumbnail Uploaded Successfuly"; 
//               }
//            else
//                {
//                 this.uiService.alertSuccess("Sorry, thumbnail Couldn't Be Uploaded");
//                 //   this.errorMsg = "Sorry, thumbnail Couldn't Be Uploaded"; 
//                }
//          },
//               // error callback
//          err => {
//               this.errorMsg = "Sorry, Something went wrong"; 
//          }, 
//          () => {
           
//          }
//        );
//     }

}
export interface AddThumbnailResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
  }