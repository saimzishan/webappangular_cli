import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { ServiceModel } from '../models/service.model';
import { ServiceService } from '../services/service.service';
import { UIService } from '../../shared/services/ui.service';
import { Router } from '@angular/router';


@Component({
    selector: 'department-service',
    templateUrl: '../templates/department-service.component.html'
})
export class DepartmentServiceComponent implements OnInit {

    isMovedLeft: boolean;
    isMovedRight: boolean;
    branchServices: any[] = [];
    branchDepartmentServices: any[] = [];

    constructor(private http: HttpClient, private router: Router, private serviceService: ServiceService, private uiService: UIService) {
        this.isMovedLeft = false;
        this.isMovedRight = true; 
     }

    ngOnInit() { 

    }

    selectBranchService(service: any){
        service.isSelected = !service.isSelected;
    }

    selectBranchDepartmentService(service: any){
        service.isSelected = !service.isSelected;
    }

    pushToBranchDepartment(){
        let arr: any[] = [];
        for (let ser of this.branchServices){
            if(ser.isSelected == true){
                ser.isSelected = false;
                this.branchDepartmentServices.push(ser);
                arr.push(ser);   
            }
            if(this.isMovedLeft == true || this.isMovedRight == true && this.branchDepartmentServices.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;
            }
        }
        for (let val of arr){
            let index = this.branchServices.indexOf(val);
            this.branchServices.splice(index,1);
        }
    }

    pushBackToBranchService(){
        let arr: any[] = [];        
        for (let ser of this.branchDepartmentServices){
            if(ser.isSelected == true){
                ser.isSelected = false;                
                this.branchServices.push(ser);
                arr.push(ser);                  
            }
            if(this.isMovedLeft == true  || this.isMovedRight == true && this.branchServices.length != 0){
                this.isMovedLeft = false;
                this.isMovedRight = false;                
            }           
        }
        for (let val of arr){
            let index = this.branchDepartmentServices.indexOf(val);
            this.branchDepartmentServices.splice(index,1);
        }
    }

    pushAllToBranchDepartment(){
        for (let ser of this.branchServices){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.branchDepartmentServices.push(ser);
        }
        this.branchServices =[];
        this.isMovedLeft = true;
        this.isMovedRight = false;
    }

    pushAllBackToBranchService(){
        for (let ser of this.branchDepartmentServices){
            if(ser.isSelected == true){
                ser.isSelected = false;
            }
            this.branchServices.push(ser);
        }
        this.branchDepartmentServices = [];
        this.isMovedLeft = false;
        this.isMovedRight = true;        
    }

}