import { Component, OnInit,  } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { CustomerModel, BranchEmployeeModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'customer-view',
    templateUrl: '../templates/customer-view.component.html'
})


export class CustomerViewComponent implements OnInit {
    private temp = JSON.parse(localStorage.getItem('currentUser'));
   

    constructor() {
    }
    
    ngOnInit(): void {
 
    }

}