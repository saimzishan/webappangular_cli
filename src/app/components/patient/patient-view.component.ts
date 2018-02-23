import { Component,OnInit } from '@angular/core';

declare var $: any;
@Component({
 selector: 'patient-view', 
 templateUrl: '../patient/patient-view.component.html'
})

export class PatientViewComponent implements OnInit{

    ngOnInit():void{
        $("#tblPatientData").DataTable();
    }
 
 }


