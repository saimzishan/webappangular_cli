import { Component,OnInit } from '@angular/core';

declare var createDash: any;

declare var $: any;
@Component({
  selector: 'dashboard',
  templateUrl: '../dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  companyName: any;
  ngOnInit():void{
    $('.sidebar-menu').tree();
    createDash();
    this.companyName = localStorage.getItem('Company_Name');
    if (this.companyName) {} else { this.companyName = 'Peditruck'; }   
   // alert(this.companyName);                
  }

}


