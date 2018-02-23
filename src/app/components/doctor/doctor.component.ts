import { Component,OnInit } from '@angular/core';
declare var $:any;
@Component({
 selector: 'doctor', 
 templateUrl: '../doctor/doctor.component.html'
})

export class DoctorComponent implements OnInit {

    ngOnInit():void{

       $(".select2").select2();
    }
 
 }


