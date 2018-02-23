import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { AppoinmentService } from '../services/appoinment.service';
import { UIService } from '../../shared/services/ui.service';

import { CalendarEvent,  CalendarEventAction,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isSameDay, isSameMonth} from 'date-fns';
import {ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {Popover} from 'ng2-popover';
import { PartialCalenderComponent } from './partial-calender.component';
import { ServiceService } from '../../service/services/service.service';
import { EditCompanyResponse } from '../../company/services/company.service';
import { MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR } from '@angular/material';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-calender',
  templateUrl: '../templates/calender.component.html',
  styles: [
    ` .ng-valid[required], .ng-valid.required {
                border-color: #42A948; / green /
            }
            .ng-invalid:not(form) {
                border-color: #a94442; / red /
            }`
  ]
})
export class CalenderComponent implements OnInit {
  view = 'month';
  userForm: any;
  viewDate: Date = new Date();
  public activeDayIsOpen: boolean;
  public sndEvent: any = false;
  public fdList: any;
  public editData: any;
  public fileDataLength: any;
  public selected1 = false;
  public selected2 = false;
  public customService = false;
  allCustomers;
  allSpecialist;
  employeeServices;
  servicesDuration: any = false;
  str;
  start;
  isSave;
  constructor(
    private servicesService: ServiceService,
    private uiService: UIService,
    private modalService: NgbModal,
    private appointmentServices: AppoinmentService
  ) {
    this.userForm = new FormGroup({
      provider: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required])
    });
  }
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      }
    },
    {
      start: new Date(new Date(2017, 11, 1)),
      title: 'An event',
      color: {
        primary: '#000',
        secondary: '#FAE3E3'
      }
    }
  ];
  ngOnInit(): void {
    this.fdList = new Array<FileData>();
    this.editData = new EditData();
    this.fileDataLength = 0;
    this.customService = false;
    this.getAllCustomer();
    this.getAllSpecialist();
    this.isSave = false;
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        // to close area
        this.activeDayIsOpen = false;
        this.sndEvent = false;
      } else {
        this.sndEvent = events;
      }
    }
    this.editData.date = new Date().toISOString().substring(0, 10);
    // console.log(date.toISOString().substring(0, 10));
  }

  onChange(value) {
    // console.log(value);
    if (value !== 0) {
     // alert(this.allCustomers[0].First_Name );
      let temp;
      for (let i = 0; i < this.allCustomers.length; i++) {
        if (this.allCustomers[i].id === value) {
           temp = this.allCustomers[i].First_Name;
            temp += ' ' + this.allCustomers[i].Email;
            temp += ' ' + this.allCustomers[i].Phone_Number;
           console.log(temp);
           break;
         }
        console.log(temp);
      }
      this.fdList.push({
        name: temp,
        id: null,
        check: true
      });
      this.fileDataLength = this.fdList.length;
    }
    if (value === 'Asad') {
      this.selected1 = true;
      // console.log(this.disabledArray[0]);
    } else if (value === 'Ali') {
      this.selected2 = true;
    }
    this.editData.customerName = 0;
    // console.log(this.disabledArray);
  }
  removeRecord(index, i) {
    if (index === 'Asad') {
      this.selected1 = false;
    }
    if (index === 'Ali') {
      this.selected2 = false;
    }
    this.editData.customerName = 0;
    this.fdList.splice(i, 1);
    this.fileDataLength = this.fdList.length;
  }

  serviceChange(value) {
    if (value === '3') {
      this.customService = true;
    } else {
      this.customService = false;
      this.getServiceDuration(value);
    }
  }
  newFromHide() {
    this.fdList = new Array<FileData>();
    this.editData = new EditData();
    this.fileDataLength = 0;
    this.customService = false;
  }
  getAllCustomer() {
    // console.log('getting specific companies start');
    this.appointmentServices.getAllCustomer().subscribe(data => {
      if (data.statusCode === '1') {
        this.allCustomers = data.Result;
        console.log(this.allCustomers);
      } else {
        this.uiService.alertError(data.statusMessage);
      }
    });
  }
  getEmployesServices_Against_Emp_ID(id) {
    this.appointmentServices
      .getEmployesServices_Against_Emp_ID(id)
      .subscribe(data => {
        if (data.statusCode === '1') {
          this.employeeServices = data.Result;
          // console.log(data);
        } else {
          this.uiService.alertError(data.statusMessage);
        }
      });
  }
  getServiceDuration(id) {
    this.servicesService.getServicesOfCompanyByID(id).subscribe(data => {
      if (data.statusCode === '1') {
        this.servicesDuration = data.Result;
        console.log(this.servicesDuration);
      } else {
        this.uiService.alertError(data.statusMessage);
      }
    });
  }
  getEndTime(start) {
    this.str = this.servicesDuration.Duration;
    this.str = this.str.split(' ')[0];
    this.start = start.split(' ')[0];
    if (parseInt(this.start, 10) === 12 && start.split(' ')[1] === 'am') {
      this.editData.serviceTo = '1 pm';
    } else {
      this.editData.serviceTo =
        parseInt(this.str, 10) +
        parseInt(this.start, 10) +
        ' ' +
        start.split(' ')[1];
    }
  }
  getAllSpecialist() {
    this.appointmentServices.getAllSpecialist().subscribe(data => {
      if (data.statusCode === '1') {
        this.allSpecialist = data.Result;
        // console.log(this.allSpecialist);
      } else {
        this.uiService.alertError(data.statusMessage);
      }
    });
  }
  checkEmpty() {
    if (
      this.editData.serviceTo === '' ||
      this.editData.servicesFrom === '' ||
      this.editData.docID === '' ||
      this.editData.serviceID === '' ||
      this.editData.customerID === ''
    ) {
      return (this.isSave = false);
    } else {
      return (this.isSave = true);
    }
  }
  postAppiontment() {
    // console.log(this.editData);
    this.isSave = true;

    if (this.checkEmpty()) {
      this.appointmentServices.submitAppiontment(this.editData).subscribe(
        sucess => {
          if (sucess.statusCode === '1') {
            this.uiService.alertSuccess('Appiontment add Successfuly');
            // this.getDoctorTimings_Against_UserID(this.employeeActive);
            this.isSave = true;
            this.editData = new EditData();
          } else if (sucess.statusCode === '0') {
            this.isSave = false;
            this.uiService.alertError(sucess.statusMessage);
          }
        },
        resCusError => {
          // console.log(resCusError);
        }
      );
    } else {
      this.uiService.alertError('Please Fill all mindatery fields');
    }
  }
}

export class FileData {
  name: string;
  check = false;
  id: null;
}
export class EditData {
  customerID = '';
  serviceID= '';
  docID = '';
  userStatus = 1;
  date = '';
  servicesFrom = '';
  serviceTo = '';
  notification = '';
  internalNote = '';
}
