import { Component, Input , OnInit } from '@angular/core';  
import { RoleModel }  from '../models/role.model';
 
@Component({
 selector: 'partial-role', 
 templateUrl: '../templates/partial-role.component.html'
})


export class PartialRoleComponent  { 
    @Input() role: RoleModel ;
    
}