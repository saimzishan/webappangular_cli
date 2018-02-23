import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { MessagingService } from "../../../messaging.service";
import { NotificationsService } from "angular2-notifications";
import { EntryService } from '../services/entry.service'
import { LoginModel } from "../models/login.model";
import { UIService } from '../../shared/services/ui.service';
@Component({
    selector: 'login',
    templateUrl: '../templates/login.component.html'
})

export class LoginComponent {


    errMessage: string;
    tmpToken: string;
    isExist: number;

    message;
    notifyMsg: NotificationReceived;
    loginModel: LoginModel;

    constructor(private uiService: UIService, private router: Router, private ss: SharedService, private msgService: MessagingService, private _service: NotificationsService , private entryService: EntryService) {
        this.ss = ss;
        this.loginModel = new LoginModel();
    }

    signIn() {
        this.errMessage = "";

       // console.log("email and pass " + this.loginModel.strEmail + " " + this.loginModel.strPassword);

        this.entryService.logIn(this.loginModel).subscribe(data => {
            if (data.statusCode == "1") {
                this.isExist = 1;
                if(data.Result.Role == 1) {
                    this.isExist = -1;
                    this.uiService.alertError('Some thing went wrong....');
                    return;
                }
                // alert(localStorage.getItem('Company_Name'));  
                localStorage.setItem('currentUser', JSON.stringify(data.Result));                  
                if(data.Result.Role == 2){
                   
                    localStorage.setItem('Company_Name', data.Company_Details[0].Company_Name);
                   
                    if (data.Company_Details[0].Logo == null) {
                        
                    } else {
                        localStorage.setItem('Logo', data.Company_Details[0].Logo);
                    }
                    localStorage.setItem('Company_ID', data.Company_Details[0].id);                    
                    localStorage.setItem('Max_Allowed_Branches', data.Company_Details[0].Max_Allowed_Branches);
                }else if(data.Result.Role == 4){
                    localStorage.setItem('Branch_ID', data.BranchID[0].id);
                    localStorage.setItem('Company_ID', data.BranchID[0].company_ID);
                }
                this.tmpToken = data.Result.token;
                console.log(data.Result);
                //alert('gggg');
            }
            else {
                this.isExist = 2;
                this.tmpToken = "";
            }
        },
            // error callback
            err => {
                this.makeDecision(3, "");
            },
            () => {
                this.makeDecision(this.isExist, this.tmpToken);
            }
        );

    }

    makeDecision(exist: number, tkn: string) {
        if(this.isExist == -1){
            return;
        }
        if (exist === 1) {
           window.location.reload();                        
            this.ss.change();

            this.msgService.getPermission()
            this.msgService.receiveMessage()
            this.message = this.msgService.currentMessage

            this.message.subscribe(data => {

                if (data != null) {
                    this.notifyMsg = data;
                    this.check(this.notifyMsg.notification.title, this.notifyMsg.notification.body);
                }
            });
            this.router.navigate(['/dashboard']);
        }
        else if (exist === 2) { this.errMessage = "Invalid Email/Password"; }
        else {
            //  this.token = "temptoken";
            //  this.register = "";
            this.errMessage = "Sorry, Something went wrong";
        }
    }

    check(title: string, content: string) {
        this._service.info(title, content);
    }
}

export interface Notification {
    title: string;
    body: string;
    icon: string;
}

export interface NotificationReceived {
    from: string;
    collapse_key: string;
    notification: Notification;
}
