import { Component, OnInit,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { PediturkApi } from './pediturk-api'
import { SharedService } from './shared.service';
import {TranslateService} from 'ng2-translate';

import { UIService } from './modules/shared/services/ui.service';
declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit,AfterViewInit {

  public temp:any;
  adminRole: any;
  customWidth = null;
  imageSrc = null;
  backColor;
  compamnyName = 'Companies';
    constructor(private router: Router,private ss: SharedService,private translate: TranslateService, private uiService:UIService) {
    this.temp = localStorage.getItem('currentUser');    
    translate.addLangs(['en', 'hy' , 'tu']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.uiService.setLanguage("en");
    this.isLogin = "";
    this.ss = ss;


  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.uiService.setLanguage(lang);
    }

  ngAfterViewInit()
  {
     $('.sidebar-menu').tree();
  }
  onClick() {
    alert('yes');
  }
  subscription;
  isLogin: string;
  token: string;
  username : string;
  ngOnInit(): void {
    if (localStorage.getItem('Company_Name') ) {
      this.compamnyName = localStorage.getItem('Company_Name');
    } else {
      this.compamnyName = 'Companies'
    }
    this.subscription = this.ss.getEmittedValue().subscribe(item => this.isLogin=item);
    this.temp = JSON.parse(localStorage.getItem('currentUser'));
    if (localStorage.getItem('currentUser')) {
      this.token = this.temp.token;
      this.username=this.temp.First_Name+" "+this.temp.Last_Name;
      this.isLogin = this.temp.token;
      // changes made by zeeshan
     // this.adminRole = this.temp.Role;
     // console.log(localStorage.getItem('Company_ID'));
      // changes made by zeeshan
    }
    this.imageSrc = localStorage.getItem('Logo');
    if (this.imageSrc) {
      this.imageSrc = 'http://backoffice.istanbul/api/public'+this.imageSrc;
      this.customWidth = 50;
      return;
     //  http://backoffice.istanbul/api/public/images/company/270.png
    }
      this.customWidth = 150;
      this.imageSrc = 'assets/img/pediturk-logo.png';
  }

  public nameFunction()
  {
    let temp = JSON.parse(localStorage.getItem('currentUser'));
    this.token = temp.token;
    this.username=this.temp.First_Name+" "+this.temp.Last_Name;
  }
   
  signOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Logo');
    localStorage.removeItem('Company_Name');
    localStorage.removeItem('Company_ID');
    localStorage.removeItem('Max_Allowed_Branches');
    localStorage.removeItem('Branch_ID');
    //localStorage.removeItem('Company_ID');
    this.isLogin = "";
    this.router.navigate(['/login']);
  }

  public options = {
    position: ["bottom", "right"],
    timeOut: 3000,
    lastOnBottom: true
  }

}

