import { Component } from '@angular/core';  
import { Router }    from '@angular/router'; 
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { ServiceModel }  from '../models/service.model';
import { PediturkApi } from '../../../pediturk-api'
import { ServiceService } from '../services/service.service';
import { UIService } from '../../shared/services/ui.service';


@Component({
    selector: 'service', 
    templateUrl: '../templates/service.component.html'
   })

export class ServiceComponent {
    
   private temp;

    service: ServiceModel; 
    private params;
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin','*')
                                       .set('Content-Type' ,'application/json'); 
  
    constructor(private http: HttpClient, private router: Router, private serviceService: ServiceService,private uiService: UIService) { 
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.service = new ServiceModel(); 
    }

    errorMsg: string;
    successMsg: string;
    tmp :number; 

    // addService()
    // {
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

    uploadLogo(serId:string)
    {
      console.log("upload thumbnail req");
      this.successMsg = "Uploading thumbnail..."; 

      this.headers = new HttpHeaders().set('Authorization', this.temp.token); 

      this.params = new HttpParams().set('content_type', '.png').set('userID',this.temp.id); 
     // this.uiService.alertSuccess(this.temp.id+"");
      
     console.log(" TOKEN :"+ this.temp.token);

  //      this.service.Thumbnail=this.service.templogo;
        
    //    console.log("thumbnail  : "+this.service.Thumbnail);
       this.http.post<AddThumbnailResponse>(PediturkApi.uploadThumbnail+serId,this.service.Thumbnail,{headers: this.headers,params: this.params}).subscribe(data => {
           // Read the result field from the JSON response.
           console.log("post success"+ data.statusMessage + data.statusCode+this.temp.id);
           if(data.statusCode == "1") 
              { 
                  this.uiService.alertSuccess("thumbnail Uploaded Successfuly");
                  // this.successMsg = "thumbnail Uploaded Successfuly"; 
              }
           else
               {
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

}
export interface AddThumbnailResponse {
    statusCode: string;
    statusMessage: string;
    Result: string;
  }