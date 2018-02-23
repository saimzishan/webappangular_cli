import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../models/employee.model';
import { PediturkApi } from '../../../pediturk-api';
import { EmployeeService } from '../services/employee.service';
import { UIService } from '../../shared/services/ui.service';
import { CustomerService } from '../../customer/services/customer.service'

declare var $: any;
@Component({
    selector: 'employee-time',
    templateUrl: '../templates/employee-timing.component.html',
    styles: [`
    .ng-valid[required], .ng-valid.required  {
      border-color: #42A948; /* green */
    }

    .ng-invalid:not(form)  {
      border-color: #a94442; /* red */
    }
    .liDisabled {
      pointer-events:none; //This makes it not clickable
      opacity:0.6;         //This grays it out to look disabled
    }
  `],
})


export class EmployeeTimeComponent implements AfterViewInit {
    private temp;
    employee: EmployeeModel;
    private params;
    employeeList;
    Company_ID;
    employeeActive;
    user;
    Week_Days: number;
    start_time1 ='';
    end_time1 ='';
    start_time2 ='';
    end_time2 ='';
    start_time3 ='';
    end_time3 ='';
    start_time4 ='';
    end_time4 ='';
    start_time5 ='';
    end_time5 ='';
    start_time6 ='';
    end_time6 ='';
    start_time7 ='';
    end_time7 ='';
    end_time  ='';;
    start_time  ='';;
    alreadyInCheck = false;
    is_actived = false;
    checkShow: any;
    checkShow2: any;
    checkShow3: any;
    checkShow4: any;
    checkShow5: any;
    checkShow6: any;
    checkShow7: any;
    doctorLength = -1;
    docTimingData: docTimingData[] = new Array<docTimingData>();
    docTimingData1: docTimingData[] = new Array<docTimingData>();
    docTimingData2: docTimingData[] = new Array<docTimingData>();
    docTimingData3: docTimingData[] = new Array<docTimingData>();
    docTimingData4: docTimingData[] = new Array<docTimingData>();
    docTimingData5: docTimingData[] = new Array<docTimingData>();
    docTimingData6: docTimingData[] = new Array<docTimingData>();
    docTimingData7: docTimingData[] = new Array<docTimingData>();
    private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
        .set('Content-Type', 'application/json');

    constructor( private customerService: CustomerService,  private http: HttpClient, private router: Router, private employeeService: EmployeeService, private uiService: UIService) {
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.employee = new EmployeeModel();
        this.Company_ID = localStorage.getItem('Company_ID');
        this.employeeActive = -1;
        this.docTimingData = new Array<docTimingData>();
        this.checkShow = -1;
        this.checkShow2 = -1;
        this.checkShow3 = -1;
        this.checkShow4 = -1;
        this.checkShow5 = -1;
        this.checkShow6 = -1;
        this.checkShow7 = -1;
    }

    ngAfterViewInit(): void {
        this.getEmployeesOfCompany();
    }
    getEmployeesOfCompany() {
        this.customerService.getAllSpecialist().subscribe(data => {
            if (data.statusCode === '1') {
              this.employeeList = data.Result;
              // console.log(this.employeeList[0]);
              this.getDoctorTimings_Against_UserID(this.employeeList[0].id);
            } else {
                this.uiService.alertError('Sorry, Something went wrong');
            }
        },
            err => {
                this.uiService.alertError('Sorry, Something went wrong');
            });
    } 
    getUserByID(id) {
        this.customerService.getUserByID(id).subscribe(data => {
            if (data.statusCode === '1') {
              this.user = data.Result;
              // console.log(this.employeeList);
            } else {
                this.uiService.alertError('Sorry, Something went wrong');
            }
        },
            err => {
                this.uiService.alertError('Sorry, Something went wrong');
            });
    } 
    changeView(employee) {
        // console.log(this.doctorLength + ' '+ this.docTimingData.length );
        if (this.doctorLength  == this.docTimingData.length) {
            this.employeeActive = employee.id;
            this.getDoctorTimings_Against_UserID(this.employeeActive);
        } else {
            this.uiService.alertInfo('Please save changes before leave....');
        } 
        
    }
    addTimimg(Week_Day) {
             // console.log(this.docTimingData);
             if(Week_Day == 1) {
                 if (this.start_time1 != '' && this.end_time1 != '' ) {
                    this.docTimingData1.push({Week_Days: Week_Day, start_time: this.start_time1, end_time: this.end_time1,
                        alreadyInCheck: false, is_actived: false });
                        this.checkShow = this.docTimingData1.length;
                        this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time1, end_time: this.end_time1,
                            alreadyInCheck: false, is_actived: false });
                            this.start_time1 = '';
                            this.end_time1 = '';
                 } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
               
             }
             if(Week_Day == 2) {
                if (this.start_time2 != '' && this.end_time2 != '' ) {
                    this.docTimingData2.push({Week_Days: Week_Day, start_time: this.start_time2, end_time: this.end_time2,
                        alreadyInCheck: false, is_actived: false });
                        this.checkShow2 = this.docTimingData2.length;
                        this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time2, end_time: this.end_time2,
                            alreadyInCheck: false, is_actived: false });
                            this.start_time2 = '';
                            this.end_time2 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
             if(Week_Day == 3) {
                if (this.start_time3 != '' && this.end_time3 != '' ) {
                    this.docTimingData3.push({Week_Days: Week_Day, start_time: this.start_time3, end_time: this.end_time3,
                    alreadyInCheck: false, is_actived: false });
                    this.checkShow3 = this.docTimingData3.length;
                    this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time3, end_time: this.end_time3,
                        alreadyInCheck: false, is_actived: false });
                        this.start_time3 = '';
                        this.end_time3 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
             if(Week_Day == 4) {
                if (this.start_time4 != '' && this.end_time4 != '' ) {
                    this.docTimingData4.push({Week_Days: Week_Day, start_time: this.start_time4, end_time: this.end_time4,
                    alreadyInCheck: false, is_actived: false });
                    this.checkShow4 = this.docTimingData4.length;
                    this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time4, end_time: this.end_time4,
                        alreadyInCheck: false, is_actived: false });
                        this.start_time4 = '';
                        this.end_time4 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
             if(Week_Day == 5) {
                if (this.start_time5 != '' && this.end_time5 != '' ) {
                    this.docTimingData5.push({Week_Days: Week_Day, start_time: this.start_time5, end_time: this.end_time5,
                    alreadyInCheck: false, is_actived: false });
                    this.checkShow5 = this.docTimingData5.length;
                    this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time5, end_time: this.end_time4,
                        alreadyInCheck: false, is_actived: false });
                        this.start_time5 = '';
                        this.end_time5 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
             if(Week_Day == 6) {
                if (this.start_time6 != '' && this.end_time6 != '' ) {
                    this.docTimingData6.push({Week_Days: Week_Day, start_time: this.start_time6, end_time: this.end_time6,
                    alreadyInCheck: false, is_actived: false });
                    this.checkShow6 = this.docTimingData6.length;
                    this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time6, end_time: this.end_time6,
                        alreadyInCheck: false, is_actived: false });
                        this.start_time6 = '';
                        this.end_time6 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
             if(Week_Day == 7) {
                if (this.start_time7 != '' && this.end_time7 != '' ) {
                    this.docTimingData7.push({Week_Days: Week_Day, start_time: this.start_time7, end_time: this.end_time7,
                    alreadyInCheck: false, is_actived: false });
                    this.checkShow7 = this.docTimingData7.length;
                    this.docTimingData.push({Week_Days: Week_Day, start_time: this.start_time7, end_time: this.end_time7,
                        alreadyInCheck: false, is_actived: false });
                        this.start_time7 = '';
                        this.end_time7 = '';
                } else {
                    this.uiService.alertInfo( 'Select start and end time' );
                }
             }
    }
    removeTimimg(index, Week_Day) {
        this.docTimingData.splice(index, 1);
        //console.log(this.docTimingData);        
        if (Week_Day == 1) {
            this.docTimingData1.splice(index, 1);
            if(this.docTimingData1.length == 0)
                this.checkShow = -1;
        }
        if (Week_Day == 2) {
            this.docTimingData2.splice(index, 1);
            if(this.docTimingData2.length == 0)
                this.checkShow2 = -1;
        }
        if (Week_Day == 3) {
            this.docTimingData3.splice(index, 1);
            if(this.docTimingData3.length == 0)
                this.checkShow3 = -1;
        }
        if (Week_Day == 4) {
            this.docTimingData4.splice(index, 1);
            if(this.docTimingData4.length == 0)
                this.checkShow4 = -1;
        }
        if (Week_Day == 5) {
            this.docTimingData5.splice(index, 1);
            if(this.docTimingData5.length == 0)
                this.checkShow5 = -1;
        }
        if (Week_Day == 6) {
            this.docTimingData6.splice(index, 1);
            if(this.docTimingData6.length == 0)
                this.checkShow6 = -1;
        }
        if (Week_Day == 7) {
            this.docTimingData7.splice(index, 1);
            if(this.docTimingData7.length == 0)
                this.checkShow7 = -1;
        }

    }
    onSubmit() {
        if(this.employeeActive == -1) {
            this.uiService.alertInfo('Please select any employee...');
        } else if (this.docTimingData.length == 0) {
            this.uiService.alertInfo('Please select some day(s) & time first...');
        } else if (this.doctorLength  == this.docTimingData.length) {
            this.uiService.alertInfo('No changes are detected...');
        } else {
           // console.log(this.docTimingData);
            this.employeeService.addEmployeeTiming(this.docTimingData, this.employeeActive).subscribe(sucess => {
                if (sucess.statusCode === '1') {
                  this.uiService.alertSuccess('Employee Timing add Successfuly');
                  this.ngAfterViewInit();
                  // this.getDoctorTimings_Against_UserID(this.employeeActive);
                } else if (sucess.statusCode === '0') {
                  this.uiService.alertError( sucess.statusMessage );
                }
              },
              resCusError => {  // console.log(resCusError); 
            },
            );
        }
    }
    getDoctorTimings_Against_UserID(id) {
        this.employeeActive = id;
        this.employeeService.getDoctorTimings_Against_UserID(id).subscribe(data => {
            if (data.statusCode === '1') {
              let doctime = data.Result;
              this.doctorLength  = doctime.length;
              this.alreadyInTinimg(doctime);
              // console.log(doctime.length);
            } else {
                this.uiService.alertError('Sorry, Something went wrong');
            }
        },
            err => {
                this.uiService.alertError('Sorry, Sodomething went wrong');
            });
    } 
    reIntialArrays() {
        this.docTimingData = new Array<docTimingData>();
        this.checkShow = -1;
        this.checkShow2 = -1;
        this.checkShow3 = -1;
        this.checkShow4 = -1;
        this.checkShow5 = -1;
        this.checkShow6 = -1;
        this.checkShow7 = -1;
        this.docTimingData = new Array<docTimingData>();
        this.docTimingData1 = new Array<docTimingData>();
        this.docTimingData2  = new Array<docTimingData>();
        this.docTimingData3  = new Array<docTimingData>();
        this.docTimingData4  = new Array<docTimingData>();
        this.docTimingData5  = new Array<docTimingData>();
        this.docTimingData6  = new Array<docTimingData>();
        this.docTimingData7  = new Array<docTimingData>();
    }
    alreadyInTinimg(timingData) {
        this.reIntialArrays();
        for(let row of timingData) {
            this.docTimingData.push({Week_Days: row.Week_Days, start_time: row.start_time, end_time: row.end_time,
                alreadyInCheck: true, is_actived: row.is_active });
                // console.log(this.docTimingData);
                this.end_time = row.end_time;
                this.start_time = row.start_time;
                if(row.Week_Days == 1) {
                   this.docTimingData1.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow = this.docTimingData1.length;
                } else if(row.Week_Days == 2) {
                   this.docTimingData2.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow2 = this.docTimingData2.length;
                } else if(row.Week_Days == 3) {
                   this.docTimingData3.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow3 = this.docTimingData3.length;
                } else if(row.Week_Days == 4) {
                   this.docTimingData4.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow4 = this.docTimingData4.length;
                } else if(row.Week_Days == 5) {
                   this.docTimingData5.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow5 = this.docTimingData5.length;
                } else if(row.Week_Days == 6) {
                   this.docTimingData6.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow6 = this.docTimingData6.length;
                } else if(row.Week_Days == 7) {
                   this.docTimingData7.push({Week_Days: row.Week_Days, start_time: this.start_time, end_time: this.end_time,
                       alreadyInCheck: false, is_actived: false });
                       this.checkShow7 = this.docTimingData7.length;
                }
        }
        this.end_time = '';
        this.start_time = '';
        //console.log(this.docTimingData);
    }
}
export class docTimingData {
    Week_Days: number;
    start_time: string;
    end_time: string;
    alreadyInCheck = false;
    is_actived = false;
  }
  export class docTiming {
    userID;
    Data = new actualData();
  }
  export class actualData {
    Week_Days: number;
    start_time: string;
    end_time: string;
  }
