import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { AppoinmentService } from '../services/appoinment.service';
import { UIService } from '../../shared/services/ui.service';

@Component({
    selector: 'app-appoinment',
    templateUrl: '../templates/home.component.html'
})


export class AppoinmentComponent implements OnInit {
    appiontments;
    constructor(
        private uiService: UIService,
        private appointmentServices: AppoinmentService
    ) {
    }
    ngOnInit() {
        this.getAllAppiontments();
    }
    getAllAppiontments() {
        this.appointmentServices.getAllAppiontment().subscribe(data => {
            //     console.log("get all companies success" + data.statusMessage + data.statusCode);
            if (data.statusCode === '1') {
                this.appiontments = data.Result;
                // console.log(this.appiontments);
            } else {
                this.uiService.alertError(data.statusMessage);
            }
        });
    }
}
