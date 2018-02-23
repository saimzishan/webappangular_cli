import {Component, Input, OnInit, ElementRef, AfterViewInit, Output, EventEmitter, Directive} from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { UIService } from '../../shared/services/ui.service';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api';
import { BranchService } from '../../branch/services/branch.service';
import { DepartmentService } from '../../department/services/department.service';
import { RoleService } from '../../role/services/role.service';
import { EmployeeService } from '../services/employee.service';

import { CompanyService } from '../../company/services/company.service';
import {getUserByCompanyResult} from '../services/employee.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import { ModelFormComponent } from '../../../components/appointment/model-form/model-form.component';
const URL = 'http://backoffice.istanbul/api//certificates/certificate/';


declare var $: any;
@Component({
    selector: 'partial-employee',
    templateUrl: '../templates/partial-employee.component.html',
    styles: [`
      .ng-valid[required], .ng-valid.required  {
        border-color: #42A948; /* green */
      }

      .ng-invalid:not(form)  {
        border-color: #a94442; /* red */
      }
      .liDisabled {
        pointer-events:none; //This makes it not clickable
        opacity:0.6;         //This grays it out to look disabled
      }
      .customColor {
        background-color: #E7EAF0;
        padding-top: 2%;
        margin-bottom: 10px;
      }
      .customPadding {
        padding-top: 2px;
      }
    `],
  providers: [EmployeeService],
})


export class PartialEmployeeComponent implements OnInit {

    roles: Result[]=[];
    branches: Result[]=[];
    departments: Result[]=[];
    employees: Result[]=[];
    companies: Result[]=[];
    tem: Result[];
    manager: Result = { "text": '', "id": 0 };
    company: Result = { "text": '', "id": 0 };
    branch: Result = { "text": '', "id": 0 };
    department: Result = { "text": '', "id": 0 };
    role: Result = { "text": '', "id": 0 };
    @Input() employee: EmployeeModel;
    employeeList: any;
    viewEmployees;
    id;
    mainView = true;
    singleView = false;
    userForm: any;
    errorMsg: string;
    successMsg: string;
    currentTabIndex = 0;
    tempBranches;
    temp;
    employeeActive;
    editEmployees = new EditEmployee();
    Skills: string = '';
    public addSucess = true;
  private params;
  public tempRoles;
  fdList: FileData[] = new Array<FileData>();
  serviceList: ServicesData[] = new Array<ServicesData>();
  subDynamicFields: ServicesSubData[] = new Array<ServicesSubData>();
  fdLength: any = false;
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  public customCondition: boolean;
  public isMatch = false;
  private base64textString = '';
  private skil: any;
  private binaryString: '';
  private file: any;
  private empDetials: any | null;
  private Company_ID: string | null;
  private numberOfFile = 0;
  private recorFile: any;
  private uploadedRecord: any;
  private arraySplice: any;
  private empID: any;
  private servicesCatList: any;
  private servicesList: any;
  servicesData: any;
  checkEmployeeID;
  newForm: FormGroup;
  ISCHECKED = false;
  singleEmployee;
  editFormCheck = false;
  isDoctor;
  docTimingData;
    constructor(private el: ElementRef, private  formBuilder: FormBuilder, private http: HttpClient, private uiService: UIService,
                private roleService: RoleService, private branchService: BranchService,
                private departmentService: DepartmentService, private employeeService: EmployeeService,
                private companyService: CompanyService) {
                this.temp = JSON.parse(localStorage.getItem('currentUser'));
                this.employee = new EmployeeModel();
                this.setFrom();
                this.empDetials = localStorage.getItem('currentUser');
                this.Company_ID = localStorage.getItem('Company_ID');
                this.docTimingData = new docTimingData();
   
              }

    ngOnInit(): void {
      // this.displayEmployeesList();
      this.getEmployeesOfCompany();
      this.getAllRoles();
     // console.log(this.userForm.controls);
      this.getServicesCatByComID();
    }
    addNewFielda() {
        this.serviceList = new Array<ServicesData>();
        this.subDynamicFields = new Array<ServicesSubData>();   
      for (let i = 0; i< this.servicesCatList.length; i++) {
        this.serviceList.push({mainCheckBoxId: this.servicesCatList[i].id,
                              mainCheckBoxName: this.servicesCatList[i].Services_Category_Name,
                              mainCheck: false,
                              });
         for (let subRow of this.servicesData[i]) {
           this.subDynamicFields.push({
                mainCheckBoxId: this.servicesCatList[i].id,
                subCheckBoxId: subRow.id,
                subCheckBoxName: subRow.Service_Name,
                subPrice: subRow.Price,
                subCapMin: '1',
                subCapMax: '1',
                subCheck: false,
           });
        } 
      }    
    }
    getServicesCatByComID() {
      this.employeeService.readCategoriesOfCompany(this.Company_ID).subscribe(data => {
          if (data.statusCode === '1') {
            this.servicesCatList = data.Result;
            this.servicesData = data.Services;
            console.log(this.servicesCatList);
            this.addNewFielda();
          } else {
            this.uiService.alertError('Sorry, Something went wrong');
          }
        },
        err => {
          this.uiService.alertError('Sorry, Something went wrong');
        });
    }
  handleFileSelect(evt) {
    var files = evt.target.files;
    this.file = files[0] ;
    if (files && this.file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.fdList.push({name: this.file.name, id: null,
      content: this.base64textString, extension: this.file.type, check: false});
    this.fdLength = this.fdList.length;
    // console.log(this.base64textString);
     // console.log(this.temp.token);
    this.base64textString = '';
    }
  removeFile(id, index) {
     //  alert(index);
     // this.recorFile =  this.fdList.splice(index, 1);
    this.recorFile = id;
    this.arraySplice = index;
    // console.log(this.recorFile);
  }
  cosmeticDentistry(e, mainID, index) {
    this.editFormCheck = true;
   if (this.serviceList[index].mainCheck) {
    this.serviceList[index].mainCheck = false;
   } else {
    this.serviceList[index].mainCheck = true;
   }
   for (let i = 0; i < this.subDynamicFields.length; i++) {
       if (this.subDynamicFields[i].mainCheckBoxId  === mainID) {
        this.subDynamicFields[i].subCheck = this.serviceList[index].mainCheck;
       }
   }
  }
  checkMain(index, mainID, mainIndex) {
    let temp = 0;
    this.editFormCheck = true;
    this.subDynamicFields[index].subCheck = !this.subDynamicFields[index].subCheck;
    for (let i = 0; i < this.subDynamicFields.length; i++) {
        if (this.subDynamicFields[i].mainCheckBoxId == mainID) {
            if (!this.subDynamicFields[i].subCheck) {
                temp = 1;
                break;
            }
        }
    }
    if (temp == 0) {
        this.serviceList[mainIndex].mainCheck = true;
    } else {
        this.serviceList[mainIndex].mainCheck = false;
    }
  }
  deleteCertificatec() {
     //  alert('yes');
      this.employeeService.deleteCertificatesByID( this.recorFile).subscribe(data => {
          if (data.statusCode === '1') {
            this.uiService.alertSuccess('File Deleted Successfuly');
            this.recorFile =  this.fdList.splice(this.arraySplice, 1);
            this.recorFile = null;
            this.uploadedRecord = null;
          } else {
            this.uiService.alertError('Sorry, Something went wrong');
          }
        },
        // error callback
        err => {
          this.uiService.alertError('Sorry, Something went wrong');
        },
        () => {
        }
      );
  }
  CertificatesAgainstEmpID(empID) {
  }
  chechCustom() {
    this.addSucess = true;
  }
  setFrom() {
    this.ISCHECKED = false;
    this.currentTabIndex = 0;
      this.userForm = new  FormGroup({
        First_Name: new FormControl('', [Validators.required]),
        Last_Name: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required]),
        conPassword: new FormControl(''),
        Role: new FormControl('', [Validators.required]),
        Address: new FormControl(''),
        Blood_Type: new FormControl(''),
        Marital_Status: new FormControl(''),
        Driving_Licence: new FormControl('', [Validators.required, Validators.minLength(13)]),
        Bank_Account_IBAN: new FormControl('', [Validators.required, Validators.minLength(13)]),
        Birth_place: new FormControl(''),
        Graduation: new FormControl(''),
        Speciality: new FormControl(''),
        Experience: new FormControl(''),
        externalcompanyName: new FormControl(''),
        Date_of_Joining: new FormControl(''),
        Social_Security_Number: new FormControl(''),
        Employee_Comission_Type: new FormControl(''),
        Date_of_Leaving: new FormControl(''),
        Emergency_Contact_Person: new FormControl(''),
        Emergency_Contact_Number: new FormControl(''),
        Internal_Telephone_Extension: new FormControl(''),
        Comission_Rate: new FormControl(''),
        mainRowCheckBox: new FormControl(''),
      });
    }
  onChange(event: any) {
      // console.log(event.target.value);
    // let files = [].slice.call(event.target.files);
  }
  createSkills() {
      if (this.userForm.value.Ionic) {
        this.Skills += 'Ionic,';
      }
      if (this.userForm.value.Java) {
        this.Skills += 'Java,';
      }
      if (this.userForm.value.C) {
        this.Skills += 'C,';
      }
      if (this.userForm.value.Ruby) {
        this.Skills += 'Ruby,';
      }
      if (this.userForm.value.Php) {
        this.Skills += 'Php,';
      }
      if (this.userForm.value.Angular) {
        this.Skills += 'Angular,';
      }
  }
  changeView(employee, status) {
    this.checkEmployeeID  = employee.id;
    // alert(this.checkEmployeeID);
      this.setFrom();
      this.editEmployees = new EditEmployee();
      this.currentTabIndex = 0;
      if (status === 'not') {
        this.mainView = !this.mainView;
        this.singleView = !this.singleView;
      }
      if (employee != '123') {
        this.employeeActive = employee.id;
      }
      if (this.mainView) {
        this.editEmployees = new EditEmployee();
      }
      if (this.singleView) {
        this.getEmployeDataByID(this.checkEmployeeID);
    }
  }
  getEmployeDataByID(id) {
    this.employeeService.getSingleEmpData(id).subscribe(data => {
      if (data.statusCode === '1') {
          this.singleEmployee = data.Result;
          this.getDataOfEmployee(this.singleEmployee);
          // console.log(this.singleEmployee);
          //this.temp = data.Result;
      } else {
          this.errorMsg = "Sorry, Something went wrong";
      }
    },
        err => {
            this.errorMsg = "Sorry, Something went wrong";
        });
  }

  getDataOfEmployee(employee: any) {
    this.editEmployees.Last_Name = employee.get_user_data.Last_Name;
    this.editEmployees.First_Name = employee.get_user_data.First_Name;

    this.editEmployees.Password = employee.get_user_data.Password;
    this.editEmployees.Email = employee.get_user_data.Email;
    this.editEmployees.Role = employee.get_user_data.Role;
    this.editEmployees.Blood_Type = employee.Blood_Type;
    this.editEmployees.Marital_Status = employee.Marital_Status;
    this.editEmployees.Driving_Licence = employee.Driving_Licence;
    this.editEmployees.Bank_Account_IBAN = employee.Bank_Account_IBAN;
    this.editEmployees.Birth_place = employee.Birth_place;
    this.editEmployees.Address = employee.Address;
    this.editEmployees.Graduation = employee.Graduation;
    this.editEmployees.Speciality = employee.Speciality;
    this.editEmployees.Experience = employee.Experience;
    this.editEmployees.externalcompanyName = employee.External_Company_Name;
    this.editEmployees.Date_of_Joining = employee.Date_of_Joining;
    this.editEmployees.Date_of_Leaving = employee.Date_of_Leaving;
    this.editEmployees.Emergency_Contact_Person = employee.Emergency_Contact_Person;
    this.editEmployees.Emergency_Contact_Number = employee.Emergency_Contact_Number;
    this.editEmployees.Internal_Telephone_Extension = employee.Internal_Telephone_Extension;
    this.editEmployees.Social_Security_Number = employee.Social_Security_Number;
    this.editEmployees.Comission_Rate = employee.Comission_Rate;
    this.editEmployees.Employee_Comission_Type = employee.Employee_Comission_Type;
    this.editEmployees.EmployeeID = employee.id;


    if (employee.getcertificate_data.length > 0) {
      this.fdList = new Array<FileData>();
      this.base64textString = '76876f87d867d6d786d786d87d6';
      for (let i of employee.getcertificate_data ) {
        this.fdList.push({name: i.Certificate_Name, id: i.id,
          content: this.base64textString, extension: i.certificate_type, check: true});
      }
      this.fdLength = employee.getcertificate_data.length;
    }
    for (let i = 0; i < this.subDynamicFields.length; i++) {
      this.subDynamicFields[i].subCheck = false;
    }
    // console.log(employee.get_empl_services_data);
    for (let i = 0; i < this.subDynamicFields.length; i++ ) {
      // subCheck
      for (let j = 0; j < employee.get_empl_services_data.length; j++ ) {
        if (employee.get_empl_services_data[j].ServiceID == this.subDynamicFields[i].subCheckBoxId ) {
          this.subDynamicFields[i].subCheck = true;
        }
      }
    }
  }

  confirmPass() {
    if ( this.userForm.value.conPassword === this.userForm.value.Password) {
      this.isMatch = false;
    }else {
      this.isMatch = true;
    }
  }
  onSubmit() {
    // console.log(service);
    this.createSkills();
    if (this.userForm.invalid) {
      this.onLinkClick(123);
      return;
    } /*else if (this.userForm.valid) {
      console.log(this.userForm, this.Skills);
      return;
    }*/
    // validations
    let service = [];
    for (let row of this.subDynamicFields) {
        if (row.subCheck) {
            service.push(row); 
        }
    }
    if (this.currentTabIndex === 3) {
      this.employeeService.addEmployee(this.userForm.value, service,  this.Skills).subscribe(sucess => {
          if (sucess.statusCode === '1') {
            // this.geAllUsers();
            this.uiService.alertSuccess('Employee Added Successfuly');
            this.addSucess = false;
            this.subDynamicFields = [];
            this.ngOnInit();
          } else if (sucess.statusCode === '0') {
            this.uiService.alertError( sucess.statusMessage );
          }
        },
        resCusError => {  console.log(resCusError); },
      );
    }
  }
  onEditSubmit() {
    this.createSkills();
    let service = [];
    for (let row of this.subDynamicFields) {
        if (row.subCheck) {
            service.push(row); 
        }
    }
    // console.log(service);
    if (this.userForm.untouched && (!this.editFormCheck) ) {
      this.uiService.alertError('No changes are dectected....');
      this.onLinkClick('123');
      return;
    }
      this.employeeService.editEmployee(this.editEmployees, service,  this.Skills).subscribe(sucess => {
          if (sucess.statusCode === '1') {
            // this.geAllUsers();
            this.ngOnInit();
          
            this.mainView = !this.mainView;
            this.singleView = !this.singleView;
            this.setFrom();
            this.editFormCheck = false;
            this.subDynamicFields = [];
            this.uiService.alertSuccess('Employee Updated Successfuly');
            this.addSucess = false;
          } else if (sucess.statusCode === '0') {
            this.uiService.alertError( sucess.statusMessage );
          }
        },
        resCusError => {  console.log(resCusError); },
      );
  }
  checkEmailAlReady() {
    for (let i = 0; i < this.employeeList.length; i++) {
      if(this.checkEmployeeID != this.employeeList[i].id) {
        let d1 = this.employeeList[i].Email.toUpperCase();
        let d2 = this.userForm.controls.Email.value.toUpperCase();
        if(d1 === d2) {
          this.userForm.controls['Email'].setValue('');
          this.uiService.alertError('This Email allready in use , Please use another Email..');
          break;
        }
      }
    }
  }
  checkNameAlReady() {
    for (let i = 0; i < this.employeeList.length; i++) {
      //console.log(dd);
      if(this.checkEmployeeID != this.employeeList[i].id) {
        let d1 = this.userForm.controls.First_Name.value.toUpperCase();
        let d2 = this.employeeList[i].First_Name.toUpperCase();
        if(d1 === d2) {
          this.userForm.controls['First_Name'].setValue('');
          this.uiService.alertError('This name allready in use , Please use another name..');
          break;
        }
      }
    }
  }
  onLinkClick(event) {
      this.checkNameAlReady();
      this.checkEmailAlReady();
    // console.log(localStorage.getItem('currentUser'));
     if (this.singleView) { // when edit data
        if (this.userForm.controls.First_Name.invalid ||
          this.userForm.controls.Last_Name.invalid
          || this.userForm.controls.Role.invalid
          || this.userForm.controls.Driving_Licence.invalid
          || this.userForm.controls.Bank_Account_IBAN.invalid
          || this.userForm.controls.Birth_place.invalid
        ) {
          this.currentTabIndex = 0;
        } else  if (
          this.userForm.controls.Speciality.invalid || this.userForm.controls.Experience.invalid
          || this.userForm.controls.externalcompanyName.invalid
          || this.userForm.controls.Date_of_Joining.invalid
          || this.userForm.controls.Date_of_Leaving.invalid
        ) {
            if (event.index === 0) {
              this.currentTabIndex = 0;
            } else {
              this.currentTabIndex = 1;
            }
        } else if (this.userForm.controls.Emergency_Contact_Person.invalid) {
          if (event.index === 0 || event.index === 1) {
            this.currentTabIndex = event.index;
          } else {
            this.currentTabIndex = 2;
          }
        }
      } else  if ( this.mainView ) { // when Save new data
        if (this.userForm.controls.First_Name.invalid ||
          this.userForm.controls.Last_Name.invalid ||
          this.userForm.controls.Email.invalid || this.userForm.controls.Password.invalid
          || this.userForm.controls.Role.invalid
          || this.userForm.controls.Driving_Licence.invalid
          || this.userForm.controls.Bank_Account_IBAN.invalid
          || this.userForm.controls.Birth_place.invalid
        ) {
          this.currentTabIndex = 0;
          return;
        } else if (
          this.userForm.controls.Speciality.invalid || this.userForm.controls.Experience.invalid
          || this.userForm.controls.externalcompanyName.invalid
          || this.userForm.controls.Date_of_Joining.invalid
          || this.userForm.controls.Date_of_Leaving.invalid
        ) {
          if (event.index) {
            if (event.index === 0 ) {
              this.currentTabIndex = 0;
              return;
            } else {
              this.currentTabIndex = 1;
              return;
            }
          } else if (event === 123) {
            this.currentTabIndex = 1;
            return;
          }
        } else if (this.userForm.controls.Emergency_Contact_Person.invalid || this.userForm.controls.Emergency_Contact_Number.invalid
                    || this.userForm.controls.Social_Security_Number.invalid || this.userForm.controls.Comission_Rate.invalid
                    || this.userForm.controls.Comission_Rate.invalid || this.userForm.controls.Internal_Telephone_Extension.invalid
                    ) {
          if (event.index) {
            if (event.index === 0 || event.index === 1 || event.index === 2 ) {
              
              this.currentTabIndex = event.index;
              return;
            } else {
              
              this.currentTabIndex = 2;
              return;
            }
          } else if ( event === 123 ) {
            this.currentTabIndex = 2;
            return;
          }

        } else {
          if ( event === 123 ) {
            this.currentTabIndex = this.currentTabIndex + 1 ;
            return;
          }
        }
      }
  }

  uploadCertificate(empid , index) {
        // console.log("upload certificate  : idemp : " + empid);
        this.headers = new HttpHeaders().set('Authorization', this.temp.token);
        this.params = new HttpParams()
          .set('certificate_type', this.fdList[index].extension)
          .set('employ_ID', empid)
          .set('content_type', '.' + 'docs'  )
            .set('userID', this.temp.id)
            .set('Certificate_Name', this.fdList[index].name);
        this.http.post<AddCertificateResponse>(PediturkApi.uploadCertificate, this.fdList[index].content,
          { headers: this.headers, params: this.params }).subscribe(data => {
            // Read the result field from the JSON response.
            // console.log('post success' + data.statusMessage + data.statusCode + this.temp.id);
            if (data.statusCode === '1') {
                this.uiService.alertSuccess('certificate Uploaded Successfuly');
              this.fdList[index].check = true;
              this.fdList[index].id = data.Result.id;
              // console.log(data.Result.id);
              this.uploadedRecord = data.Result;
              // this.successMsg = "thumbnail Uploaded Successfuly";
            } else {
                this.uiService.alertSuccess('Sorry, certificate Couldnot Be Uploaded');
                //   this.errorMsg = "Sorry, thumbnail Couldn't Be Uploaded";
            }
        },
            // error callback
            err => {
                this.errorMsg = 'Sorry, Something went wrong';
            },
            () => {

            }
        );
    }

  initTable() {
        $("#tblEmployeeDataPartial").DataTable(
          {
            retrieve: true,
            'order': [],
          }
        );
    }


  deleteEmploy(id) {
    this.empID = id;
  }
  deleteEmployee() {
        this.id = this.empID;
        console.log(this.id);
        this.employeeService.deleteEmployee(this.id).subscribe(data => {
            // console.log("delete by id" + data.statusMessage + data.statusCode);
            // console.log("employee id to delete " + this.id);
            if (data.statusCode === '1') {
                this.uiService.alertSuccess('Employee Deleted Successfuly');
                this.displayEmployeesList();
            } else {
                this.uiService.alertError('Sorry, Something went wrong');
            }
        },
            // error callback
            err => {
                this.uiService.alertError('Sorry, Something went wrong');
            },
            () => {

            }
        );
    }


  disableStatus() {
        this.id = this.employee.User_ID;

        this.errorMsg = "";
        this.successMsg = "";

        this.employeeService.disableStatus(this.id).subscribe(data => {
            /*console.log("disable by id" + data.statusMessage + data.statusCode);
            console.log("employee id to disable " + this.id);*/
            if (data.statusCode == "1") {
                this.uiService.alertSuccess("Employee disable Successfuly");

                this.employees = this.employees.filter(h => h.id !== Number.parseInt(this.id));
                this.initTable();
            } else {
                this.uiService.alertError("Sorry, Something went wrong");
            }
        },
            // error callback
            err => {
                this.uiService.alertError("Sorry, Something went wrong");
            },
            () => {

            }
        );
    }
    getAllCompanies() {
        // console.log("get all companies start");

        this.companyService.getCompanies().subscribe(data => {
            if (data.statusCode == "1") {

                this.companies = data.Result.map(function (a) {
                    return {
                        text: a.companyData.Company_Name,
                        id: a.companyData.id
                    };
                });
            } else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    getBranchesOfCompany(companyId: string) {
        console.log("get all branches start");

        this.employeeService.getBranchesAgainstCompanyId(companyId).subscribe(data => {
            if (data.statusCode == "1") {
                this.tempBranches = data.Result;
                //this.temp2= data.Result;
                this.branches = data.Result.map(function (a) {
                    return {
                        text: a.Name,
                        id: a.id
                    };
                });
                //   this.branches= data.Result;

            } else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    tempDepartments;
    getDepartmentsOfBranch(branchId: string) {
        console.log("get all dept start");

        this.employeeService.getDepartmentAgainstBranchId(branchId).subscribe(data => {
            if (data.statusCode == "1") {

                this.tempDepartments = data.Result;

                //  console.log("get all branches start",JSON.stringify(this.tempDepartments));
                //this.temp2= data.Result;
                this.departments = data.Result.map(function (a) {
                    return {
                        text: a.Department_Name,
                        id: a.id
                    };
                });
                console.log("get all departments start", JSON.stringify(this.departments));

                //   this.branches= data.Result;

            } else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    getAllRoles() {
        // console.log("get all roles start");
        this.employeeService.getAllRoles().subscribe(data => {
            if (data.statusCode === '1' ) {
                this.tempRoles = data.Result;
                this.roles = data.Result.map(function (a) {
                    return {
                        text: a.Name,
                        id: a.id
                    };
                });
            } else {
                this.errorMsg = 'Sorry, Something went wrong';
            }
        },
            err => {
                this.errorMsg = 'Sorry, Something went wrong';
            },
            () => {

            }
        );
    }

    displayEmployeesList() {
        this.employeeService.getAllEmployees().subscribe(data => {
          if (data.statusCode === '1') {
            this.employeeList = data.Result;
          //  console.log(this.employeeList);
          } else {
            this.errorMsg = 'Sorry, Something went wrong';
          }
        });
    }
    assignNewData(e) {
      let date = new Date();
      let  somedate = date.toISOString().substring(18, 23);
      let newData = somedate + '@testmail.com';
      this.ISCHECKED = e.target.checked;
      if(e.target.checked) {
        this.userForm.controls['First_Name'].setValue('Test');
        this.userForm.controls['Last_Name'].setValue('name');
        this.userForm.controls['Password'].setValue('123');
        this.userForm.controls['Email'].setValue(newData);
        this.userForm.controls['conPassword'].setValue('123');
        this.userForm.controls['Role'].setValue('1');
        this.userForm.controls['Address'].setValue('Test Adress');
        this.userForm.controls['Blood_Type'].setValue('1');
        this.userForm.controls['Marital_Status'].setValue('1');
        this.userForm.controls['Birth_place'].setValue('Test Place');
        this.userForm.controls['Bank_Account_IBAN'].setValue('123ddr44re556778');
        this.userForm.controls['Graduation'].setValue('2016');
        this.userForm.controls['Driving_Licence'].setValue('11242d0f3G44556ss');
        this.userForm.controls['Speciality'].setValue('Full stack');
        this.userForm.controls['Experience'].setValue('2 year');
        this.userForm.controls['externalcompanyName'].setValue('XB');
        this.userForm.controls['Date_of_Joining'].setValue(date.toISOString().substring(0, 10));
        this.userForm.controls['Date_of_Leaving'].setValue(date.toISOString().substring(0, 10));
        this.userForm.controls['Social_Security_Number'].setValue('1122');
        this.userForm.controls['Employee_Comission_Type'].setValue('1');
        this.userForm.controls['Emergency_Contact_Number'].setValue('123456');
        this.userForm.controls['Comission_Rate'].setValue('123');
        this.userForm.controls['Emergency_Contact_Person'].setValue('Test person');
        this.userForm.controls['Internal_Telephone_Extension'].setValue('4321');
      } else {
        this.setFrom();
      }
    }
    getEmployeesOfCompany() {
      this.employeeService.readEmployeesOfCompany(this.Company_ID).subscribe(data => {
          if (data.statusCode === '1') {
            this.employeeList = data.Result;
            // console.log(this.employeeList);
          } else {
              this.uiService.alertError('Sorry, Something went wrong');
          }
      },
          err => {
              this.uiService.alertError('Sorry, Something went wrong');
          });
  }
    getUsersAgainstComapnyID() {
       // console.log("getting specific departments start");

        this.employeeService.getUsersAgainstCompanyID(this.temp.company_ID).subscribe(data => {
            if (data.statusCode === '1') {
                this.viewEmployees = data.Result;
                this.temp = data.Result;
            } else {
                this.errorMsg = 'Sorry, Something went wrong';
            }
        },
            err => {
                this.errorMsg = 'Sorry, Something went wrong';
            },
            () => {

            }
        );
    }

    geAllUsers() {
        // console.log("getting specific departments start");

        this.employeeService.getUsers().subscribe(data => {
            if (data.statusCode === '1') {
                this.viewEmployees = data.Result;
                // console.log(this.viewEmployees);
                this.temp = data.Result;
            } else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    changeEmployee(emp: any) {
        this.employee.Company_ID = emp.company_ID;
        this.employee.Branch_ID = emp.Branch_ID;
        this.employee.strEmail = emp.Email;
        this.employee.strFirstName = emp.First_Name;
        this.employee.strLastName = emp.Last_Name;
        this.employee.Role_ID = emp.Role;
        this.employee.User_ID = emp.id;
        this.employee.userTokenOfEmployee = emp.token;

        // this.manager = {
        //     text: this.employee.strFirstName,
        //     id: this.employee.User_ID
        // };

        // console.log(" Manager :", JSON.stringify(this.manager) + " passed " + JSON.stringify(emp));

        // this.manager=this.tempEmployees.filter(result=>result.id== this.getemployee[0].id)[0];

        this.getEmployeeAgainstUserID();

        this.company = this.companies.filter(result => result.id === emp.company_ID)[0];
        //     this.getCompany(this.companies.indexOf(this.company));

        this.branch = this.branches.filter(result => result.id === emp.Branch_ID)[0];
       /* console.log("Companies::"+JSON.stringify(this.companies));
        console.log("Company::"+JSON.stringify(this.company));
        console.log("Branch::"+JSON.stringify(this.branch));*/
        this.getBranch(this.branches.indexOf(this.branch));
        this.selectedBranch(this.branch);



        this.role = this.roles.filter(result => result.id === emp.Role)[0];


        // this.getDepartment(this.roles.indexOf(this.department));
        // console.log(" slected employee",  JSON.stringify( this.department) +" passed "+JSON.stringify(emp));
    }

    getCompany(val: number): Result {
        return this.companies[val];
    }

    getBranch(val: number): Result {
        return this.branches[val];
    }

    getDepartment(val: number): Result {
        return this.departments[val];
    }

    getRole(val: number): Result {
        return this.roles[val];
    }
    //   initTable() {
    //     $("#tblEmployeeDataPartial").DataTable();
    // }
    getemployee: getUserByCompanyResult[]= [];

    getEmployeeAgainstUserID() {

        this.employeeService.getEmployesAgainstUserID(this.employee).subscribe(data => {
            if (data.statusCode == "1") {
                this.employeeList = data.Result;
                this.getemployee = data.Result;
               // console.log("getEmployeeAgainstUserID" + "SMD" + JSON.stringify(this.getemployee[0]));
                this.employee.EmployeeID = this.getemployee[0].id;

                 this.department = this.departments.filter(result => result.id == this.getemployee[0].Department_ID)[0];

                this.employee.Manager_User_ID =
                this.employee.Department_ID = this.getemployee[0].Department_ID;
                this.employee.Graduation = this.getemployee[0].Graduation;
                this.employee.Experience = this.getemployee[0].Experience;
                this.employee.Certificates = this.getemployee[0].Certificates;
                this.employee.Social_Security_Number = this.getemployee[0].Social_Security_Number;
                this.employee.Bank_Account_IBAN = this.getemployee[0].Bank_Account_IBAN;
                this.employee.Internal_Telephone_Extension = this.getemployee[0].Internal_Telephone_Extension;
                this.employee.Marital_Status = this.getemployee[0].Marital_Status;
                this.employee.Birth_place = this.getemployee[0].Birth_place;
                this.employee.Blood_Type = this.getemployee[0].Blood_Type;
                this.employee.Emergency_Contact_Person = this.getemployee[0].Emergency_Contact_Person;
                this.employee.Emergency_Contact_Number = this.getemployee[0].Emergency_Contact_Number;
                this.employee.Driving_Licence = this.getemployee[0].Driving_Licence;
                this.employee.Natitonal_ID_Details = this.getemployee[0].Natitonal_ID_Details;
                this.employee.Family_Details = this.getemployee[0].Family_Details;
                this.employee.External_Company_ID = this.getemployee[0].External_Company_ID;
                this.employee.Date_of_Joining = this.getemployee[0].Date_of_Joining;
                this.employee.Date_of_Leaving = this.getemployee[0].Date_of_Leaving;
                this.employee.Salary = this.getemployee[0].Salary;
                this.employee.Employee_Comission_Type = this.getemployee[0].Employee_Comission_Type;
                this.employee.Comission_Rate = this.getemployee[0].Comission_Rate;
                this.employee.Employee_Tip_Type = this.getemployee[0].Employee_Tip_Type;
                // console.log("EmployeeID" + this.getemployee[0].id);
            } else {
                this.errorMsg = "Sorry, Something went wrong";
            }
        },
            err => {
                this.errorMsg = "Sorry, Something went wrong";
            },
            () => {

            }
        );
    }

    roleID: number;
    roleName: string;
    rolenameandid: string[];
    filteredBranches;
    //role selection
    public selectedRole(value: any): void {

      //  console.log('Selected value is: ', value);

        this.roleID = value.id;
        this.employee.Role_ID = this.roleID;
       // console.log('id: ', this.roleID);
        this.roleName = value.text;
      //  console.log('role name: ', this.roleName);
        this.roles = null;
    }
    //role removal
    public removedRole(value: any): void {

       // console.log('removed ', JSON.stringify(this.tempRoles));
        //this.roles = null;
        this.roles = this.tempRoles;
        //  this.initTable();
    }
    companyID: string;
    companyName: string;
    companynameandid: string[];
    isCompanySelect:boolean =true;
    isBranchSelect:boolean =true;
    // filteredBranches;

    public selectedCompany(value: any): void {

       // console.log('Selected value is: ', value);

        this.companyID = value.id;
       // console.log('id: ', this.companyID);
        this.companyName = value.text;
      //  console.log('company name: ', this.companyName);
        this.branches = null;
        //binding company id
        this.employee.Company_ID = +this.companyID;
      //  console.log('company : ', this.employee.Company_ID);
        this.getBranchesOfCompany(this.companyID);

        // this.filteredBranches = this.tempBranches.filter(tempBranch => tempBranch.company_ID == value.id);
        // this.branches = this.filteredBranches.map(function (a) {
        //     return {
        //         text: a.Name,
        //         id: a.id

        //     };
        // });
        this.isCompanySelect=false;
        //  this.initTable();
    }

    public removedCompany(value: any): void {
        // console.log('removed ', JSON.stringify(this.branches));
        this.branches = null;
        this.branches = this.tempBranches;
        this.isCompanySelect=true;
        // this.initTable();
    }
    //branch selected
    branchId: string;
    filteredDepartments

    public selectedBranch(value: any): void {
        this.departments = null;

        this.branchId = value.id;
        this.employee.Branch_ID = +this.branchId;
        //sending branch id
       // console.log('branch id :' + this.employee.Branch_ID)
        //this.getUsersAgainstBranchID(this.employee.Branch_ID);

        this.getDepartmentsOfBranch(this.branchId);
       // console.log('departments : ' + this.branchId + JSON.stringify(this.tempDepartments));
        //this.filteredDepartments = this.tempDepartments.filter(tempDepartment => tempDepartment.BranchID == value.id);
        // console.log('filteredDepartments : ', JSON.stringify(this.filteredDepartments));
        // this.departments = this.filteredDepartments.map(function (a) {
        //     return {
        //         text: a.Department_Name,
        //         id: a.id

        //     };
        // });
        this.isBranchSelect =false;
    }

    //branch removed
    public removedBranch(value: any): void {
        this.departments = null;
        this.departments = this.tempDepartments;
        this.isBranchSelect =true;
    }

    //department selected
    depID
    public selectedDepartment(value: any): void {
        this.depID = value.id;
        this.employee.Department_ID = this.depID;
        // console.log('department : ', this.employee.Branch_ID);
    }

    public removedDepartment(value: any): void {
        //  console.log('removed ', JSON.stringify(this.branches)  );
        this.departments = null;
        this.departments = this.tempDepartments;
        //  this.initTable();
    }

    // manager selected
    public selectedManager(value: any): void {
        this.employee.Manager_User_ID = value.id;
       // console.log('Manager id: ', this.employee.Manager_User_ID);
    }

    // manager removed
    public removedManager(value: any): void {
        console.log('removed ', JSON.stringify(this.tempRoles));
        this.roles = null;
        this.roles = this.tempRoles;
    }
    // =============== geting doctoer timing =============
    onRoleChange() {
      if(this.userForm.value.Role == 5){
        this.isDoctor = true;
      } else {
        this.isDoctor = false;
      }
      console.log(this.userForm.value.Role);
    }
    getTimingOfDoctor() {
    }



    // =============== geting doctoer timing =============
}

export interface Result {
    id: number;
    text: string;


}

export interface AddCertificateResponse {
    statusCode: string;
    statusMessage: string;
    Result: any;
}


export class EditEmployee {
  EmployeeID = -1;
  Account_Status ;
  Bank_Account_IBAN;
  Birth_place;
  Blood_Type;
  Branch_ID;
  Certificates;
  Comission_Rate;
  Date_of_Joining;
  Date_of_Leaving;
  Address;
  Department_ID;
  Designation_ID;
  Experiance;
  externalcompanyName;
  Driving_Licence;
  Email = 'abc@gmail.com';
  Password = '123';
  Emergency_Contact_Number;
  Emergency_Contact_Person;
  Employee_Comission_Type;
  Employee_Tip_Type;
  Experience;
  External_Company_ID;
  Family_Details;
  First_Name;
  Graduation;
  Internal_Telephone_Extension;
  Last_Name;
  Manager_User_ID;
  Marital_Status;
  Natitonal_ID_Details;
  Provider;
  Role;
  Salary;
  Skills;
  Social_Security_Number;
  Speciality;
  UUID;
  User_ID;
  created_at;
  id;
  status;
  c;
  java;
  angular;
  php;
  ruby;
  ionic;
}

export class FileData {
  name: string;
  content: string;
  extension: string;
  check = false;
  id: null;
}
export class docTimingData {
  Week_Days: number;
  start_time: string;
  end_time: string;
  alreadyInCheck = false;
  is_actived = false;
}
export class ServicesData {
  mainCheckBoxName: string;
  mainCheckBoxId: number;
  mainCheck =  false;
  // subData: ServicesSubData[] = new Array<ServicesSubData>();
}
export class ServicesSubData {
  mainCheckBoxId: number;
  subCheckBoxName: string;
  subCheckBoxId: number;
  subPrice: string;
  subCapMin: string;
  subCapMax: string;
  subCheck =  false;
}