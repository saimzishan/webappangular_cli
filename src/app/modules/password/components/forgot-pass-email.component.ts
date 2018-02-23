import { Component, OnInit } from '@angular/core';  
import { PasswordService } from '../services/password.service'
import { ForgetPassEmailModel } from "../models/forgetpassemail.model"; 

@Component({
 selector: 'forgot-pass-email', 
 templateUrl: '../templates/forgot-pass-email.component.html'
})

export class ForgotPassEmailComponent {
  
  private params;
  forgetPassEmailModel:ForgetPassEmailModel
  
  constructor(private passwordService:PasswordService) { 
    this.forgetPassEmailModel=new ForgetPassEmailModel();
  }
 
  errorMsg: string;
  successMsg: string;


  sendRequest()
  {
     console.log("forgot request req start");
   //  this.params = new HttpParams().set('Email', txtEmail); 
   this.passwordService.forgetEmailPassword(this.forgetPassEmailModel).subscribe(data => {
    
          console.log("post success"+ data.statusMessage + data.statusCode);
          if(data.statusCode == "1") 
             { 
               this.successMsg = "Please check your inbox for further instructions"; 
             }
          else
              {
                this.errorMsg = "Sorry, Something went wrong"; 
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

  // sendRequest(txtEmail:string)
  // {
  //    console.log("forgot request req start");
  //    this.params = new HttpParams().set('Email', txtEmail); 

  //     this.http.post<SignupResponse>(PediturkApi.forgotPassword,"", {headers: this.headers,params: this.params}).subscribe(data => {
  //         // Read the result field from the JSON response.
  //         console.log("post success"+ data.statusMessage + data.statusCode);
  //         if(data.statusCode == "1") 
  //            { 
  //              this.successMsg = "Please check your inbox for further instructions"; 
  //            }
  //         else
  //             {
  //               this.errorMsg = "Sorry, Something went wrong"; 
  //             }
  //       },
  //        // error callback
  //       err => {
  //           this.errorMsg = "Sorry, Something went wrong"; 
  //       },
  //       () => {
          
  //       }
  //     );
       
  // }

}
