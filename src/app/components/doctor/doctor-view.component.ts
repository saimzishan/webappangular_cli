import { Component,OnInit } from '@angular/core';
declare var $:any;
@Component({
 selector: 'doctor-view', 
 templateUrl: '../doctor/doctor-view.component.html'
})

export class DoctorViewComponent implements OnInit {

    ngOnInit():void{

       $("#tblDoctorData").DataTable();
    }
 
 }


