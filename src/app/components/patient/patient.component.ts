import { Component,OnInit } from '@angular/core';

declare var $:any;

@Component({
 selector: 'patient', 
 templateUrl:  '../patient/patient.component.html'
})

export class PatientComponent implements OnInit {
 
    ngOnInit(): void{
        $('.select2').select2();
    }

 }


