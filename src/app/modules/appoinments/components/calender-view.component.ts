import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { AppoinmentService } from '../services/appoinment.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-calender-view',
    templateUrl: '../templates/employee-view.component.html'
})


export class CalenderViewComponent {
}
