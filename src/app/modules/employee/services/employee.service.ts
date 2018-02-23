import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PediturkApi } from '../../../pediturk-api'
import { EmployeeModel } from '../models/employee.model';

@Injectable()
export class EmployeeService {
    headers: HttpHeaders;
    params: HttpParams;
    private temp;
    private empDetials: any | null;
    private Company_ID: string | null;

    constructor(private http: HttpClient) {
        //this.headers = new HttpHeaders();
        this.temp = JSON.parse(localStorage.getItem('currentUser'));
        this.Company_ID = localStorage.getItem('Company_ID');
        //this.headers.append('content-type', 'application/json');
    }

    signUp(employeeModel: EmployeeModel): Observable<SignupResponse> {

        this.params = new HttpParams()
            .set('Email', employeeModel.strEmail)
            .set('Password', "pass123")
            .set('First_Name', employeeModel.strFirstName)
            .set('Last_Name', employeeModel.strLastName)
            .set('status', "1")
            .set('Role', employeeModel.Role_ID + '')

        return this.http.post(PediturkApi.signupUrl, '', { headers: this.headers, params: this.params })
            .map(res => <SignupResponse>res);
    }

    // I will send these atributes in (add employee call) body
    // Manager_User_ID is an important to send so, if Role is other than Branch_Manager
    // Then "Manager_User_ID":0, otherwise "Manager_User_ID":User_ID
    // Branch_Manager=4 in Role Table
    // {
    //     "Company_ID":2,
    //     "Branch_ID":24,
    //     "Department_ID":15,
    //     "Speciality":"Manage",
    //     "User_ID":99,
    //     "Manager_User_ID":0

    //  }

    // written by Saim Zeeshan
    addEmployee(employeeModel, service, Skills): Observable<any> {
        this.params = new HttpParams()
            .set('First_Name', employeeModel.First_Name)
            .set('Last_Name', employeeModel.Last_Name)
            .set('Password', employeeModel.Password)
            .set('Email', employeeModel.Email)
            .set('Role', employeeModel.Role)
            .set('Address', employeeModel.Address)
            .set('Blood_Type', employeeModel.Blood_Type)
            .set('Marital_Status', employeeModel.Marital_Status)
            .set('Driving_Licence', employeeModel.Driving_Licence)
            .set('Bank_Account_IBAN', employeeModel.Bank_Account_IBAN)
            .set('Birth_place', employeeModel.Birth_place)
            .set('Graduation', employeeModel.Graduation)
            .set('Speciality', employeeModel.Speciality)
            .set('Experience', employeeModel.Experience)
            .set('External_Company_Name', employeeModel.externalcompanyName)
            .set('Date_of_Joining', employeeModel.Date_of_Joining)
            .set('Social_Security_Number', employeeModel.Social_Security_Number)
            .set('Employee_Comission_Type', employeeModel.Employee_Comission_Type)
            .set('Date_of_Leaving', employeeModel.Date_of_Leaving)
            .set('Emergency_Contact_Person', employeeModel.Emergency_Contact_Person)
            .set('Emergency_Contact_Number', employeeModel.Emergency_Contact_Number)
            .set('Internal_Telephone_Extension', employeeModel.Internal_Telephone_Extension)
            .set('Comission_Rate', employeeModel.Comission_Rate)
            .set('User_ID', this.temp.id)
            .set('Designation_ID', this.temp.Role)
            .set('Manager_User_ID', '870')
            .set('Company_ID', this.Company_ID)
        // console.log('parms:' + this.params)
        // console.log(JSON.stringify(employeeModel));
        //  console.log(Skills);
        // console.log(this.params);
        // console.log(service);
        return this.http.post(PediturkApi.addEmployee, JSON.stringify(service), { headers: this.headers, params: this.params })
            .map(res => <AddRoleResponse>res);
    }
    // written by Saim Zeeshan
    editEmployee(employeeModel, service, Skills): Observable<any> {
        console.log(employeeModel);
        // console.log(this.temp.token);
        this.headers = new HttpHeaders().set('Authorization', this.temp.token);
        this.params = new HttpParams()
            .set('First_Name', employeeModel.First_Name)
            .set('Last_Name', employeeModel.Last_Name)
            .set('Password', employeeModel.Password)
            .set('Email', employeeModel.Email)
            .set('Role', employeeModel.Role)
            .set('Address', employeeModel.Address)
            .set('Blood_Type', employeeModel.Blood_Type)
            .set('Marital_Status', employeeModel.Marital_Status)
            .set('Driving_Licence', employeeModel.Driving_Licence)
            .set('Bank_Account_IBAN', employeeModel.Bank_Account_IBAN)
            .set('Birth_place', employeeModel.Birth_place)
            .set('Graduation', employeeModel.Graduation)
            .set('Speciality', employeeModel.Speciality)
            .set('Experience', employeeModel.Experience)
            .set('External_Company_Name', employeeModel.externalcompanyName)
            .set('Date_of_Joining', employeeModel.Date_of_Joining)
            .set('Social_Security_Number', employeeModel.Social_Security_Number)
            .set('Employee_Comission_Type', employeeModel.Employee_Comission_Type)
            .set('Date_of_Leaving', employeeModel.Date_of_Leaving)
            .set('Emergency_Contact_Person', employeeModel.Emergency_Contact_Person)
            .set('Emergency_Contact_Number', employeeModel.Emergency_Contact_Number)
            .set('Internal_Telephone_Extension', employeeModel.Internal_Telephone_Extension)
            .set('Comission_Rate', employeeModel.Comission_Rate)
            .set('User_ID', this.temp.id)
            .set('Designation_ID', this.temp.Role)
            .set('Company_ID', this.Company_ID)
           // console.log(this.params);
        // id chek ker lena
        return this.http.put(PediturkApi.updateEmplayee + employeeModel.EmployeeID, JSON.stringify(service), { headers: this.headers, params: this.params })
            .map(res => <AddRoleResponse>res);
    }

    deleteCertificatesByID(objID): Observable<any> {
        return this.http.delete(PediturkApi.deleteCertificate + objID, { headers: this.headers })
            .map(res => <any>res);
    }
    getAllEmployees(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        //
        return this.http.get(PediturkApi.getAllEmployee, { headers: this.headers })
            .map(res => <any>res);
    }
  readCategoriesOfCompany(companyId: any): Observable<any>{
    this.headers = new HttpHeaders();
    this.params = new HttpParams().set('Company_ID', companyId.toString());
    this.headers.set('Authorization', this.temp.token);
    return this.http.get(PediturkApi.getServiceCategoriesOfCompany, { headers: this.headers, params: this.params })
      .map(res => <any> res);
  }
  getServicesByID(categoryId: any): Observable<any> {
    this.headers = new HttpHeaders();
    // this.headers.set('Authorization', this.temp.token);
    this.params = new HttpParams().set('service_CatID', categoryId.toString());
    return this.http.get(PediturkApi.getServicesOfCategory, { headers: this.headers, params: this.params })
      .map(res => <any>res);
  }
    readEmployeesOfCompany(companyId: any): Observable<ViewResponse> {
        this.params = new HttpParams()
        .set('company_ID', companyId);
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        //
        return this.http.get(PediturkApi.getEmployeesAgainstCompany, { headers: this.headers, params: this.params })
            .map(res => <ViewResponse>res);
    }
    getCertificatesAgainstEmpID(empID): Observable<any> {
        this.params = new HttpParams()
            .set('employ_ID', empID);
        return this.http.get(PediturkApi.CertificatesAgainstEmpID, { headers: this.headers, params: this.params })
            .map(res => <any>res);
    }
    getEmployesServices_Against_Emp_ID(empID): Observable<any> {
        this.params = new HttpParams()
            .set('employ_ID', empID);
        return this.http.get(PediturkApi.getEmployesServices_Against_Emp_ID, { headers: this.headers, params: this.params })
            .map(res => <any>res);
    }
    getAllRoles(): Observable<any> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token);
        return this.http.get(PediturkApi.getAllRoles, { headers: this.headers })
            .map(res => <any>res);
    }

    deleteEmployee(objID): Observable<AddRoleResponse> {
        return this.http.delete(PediturkApi.deleteEmplayee + objID, { headers: this.headers })
            .map(res => <AddRoleResponse>res);
    }

    deleteUser(objID): Observable<AddRoleResponse> {
        this.headers = new HttpHeaders();
        this.headers.set('Authorization', this.temp.token)
            ;
        //
        return this.http.delete(PediturkApi.getOrDeleteByIdUser + objID, { headers: this.headers })
            .map(res => <AddRoleResponse>res);
    }

    getDepartmentAgainstBranchId(branchId: string): Observable<DepartmentAgainstBranchResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('BranchID', branchId);
        //   this.headers.set('Authorization', this.temp.token);
        //
        return this.http.get(PediturkApi.getDepartmentAgainstBranchId, { headers: this.headers, params: this.params })
            .map(res => <DepartmentAgainstBranchResponse>res);
    }

    getBranchesAgainstCompanyId(companyId: string): Observable<BranchesAgainstCompanyResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('company_ID', companyId);
        //   this.headers.set('Authorization', this.temp.token);
        //
        return this.http.get(PediturkApi.branchesAgainstCompanyId, { headers: this.headers, params: this.params })
            .map(res => <BranchesAgainstCompanyResponse>res);
    }

    getUsersAgainstCompanyID(objID): Observable<getUserByCompanyResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('company_ID', objID);
        //   this.headers.set('Authorization', this.temp.token);
        //
        return this.http.get(PediturkApi.getUsersAgainstCompanyID, { headers: this.headers, params: this.params })
            .map(res => <getUserByCompanyResponse>res);
    }

    getAllBranchAndEmployee(companyId: any): Observable<AllBranchesOfEmployeeResponse>{
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('Company_ID',companyId.toString());                
        this.headers.set('Authorization', this.temp.token); 
        // console.log("service URL:"+PediturkApi.getAllServicesAgainstCompanyID);
        return this.http.get(PediturkApi.showAllBranchAndEmployees, { headers: this.headers, params: this.params })
                        .map(res => <AllBranchesOfEmployeeResponse> res);
    }

    disableStatus(objID): Observable<disblaeUserResponse> {
        this.params = null;
        console.log("before" + this.params);
        this.headers = new HttpHeaders();
        this.params = new HttpParams()
            .set('status', 2 + "");

        console.log("after" + this.params);
        //   this.headers.set('Authorization', this.temp.token);
        //
        return this.http.put(PediturkApi.changeStatus + objID, "", { headers: this.headers, params: this.params })
            .map(res => <disblaeUserResponse>res);
    }

    updateUser(employeeModel: EmployeeModel): Observable<SignupResponse> {
        //  console.log(this.temp.token+"data:"+JSON.stringify(companyModel) );
        this.headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', employeeModel.userTokenOfEmployee);

        this.params = new HttpParams()
            //   .set('Email', employeeModel.strEmail)
            .set('Password', "pass123")
            .set('First_Name', employeeModel.strFirstName)
            .set('Last_Name', employeeModel.strLastName)
            .set('status', "1")
            .set('Role', employeeModel.Role_ID + "")
            .set('company_ID', employeeModel.Company_ID + "")
            .set('Branch_ID', employeeModel.Branch_ID + "");

        return this.http
            .put(PediturkApi.updateUser + employeeModel.User_ID, "", { headers: this.headers, params: this.params })
            .map(res => <SignupResponse>res);
    }

    getEmployesAgainstUserID(employeeModel: EmployeeModel): Observable<getUserByCompanyResponse> {
        this.headers = new HttpHeaders();
        this.params = new HttpParams().set('User_ID', employeeModel.User_ID + "");
        //
        return this.http.get(PediturkApi.getEmployesAgainstUserID, { headers: this.headers, params: this.params })
            .map(res => <getUserByCompanyResponse>res);
    }

    getUsers(): Observable<getAllUsersResponse> {
        this.headers = new HttpHeaders();

        //
        return this.http.get(PediturkApi.getAllUsers, { headers: this.headers })
            .map(res => <getAllUsersResponse>res);
    }
    getSingleEmpData(id): Observable<any> {
        this.headers = new HttpHeaders();
        //
        return this.http.get(PediturkApi.getSingleEmpData + id, { headers: this.headers })
            .map(res => <any>res);
    }
    addEmployeeTiming(Data, userID) {
        this.params = new HttpParams()
        .set('userID', userID)
        return this.http.post(PediturkApi.addDocTiming , JSON.stringify(Data), { headers: this.headers, params: this.params })
        .map(res => <AddRoleResponse>res);
    }
    getDoctorTimings_Against_UserID(userID) {
        this.headers = new HttpHeaders();
        this.params = new HttpParams()
        .set('userID', userID)
        return this.http.get(PediturkApi.getDoctorTimings_Against_UserID , { headers: this.headers, params: this.params })
        .map(res => <any>res);
    }
}
export interface ViewResponse {
    statusCode: string;
    statusMessage: string;
    Result: EmployeeViewResponse[];
}
export interface EmployeeViewResponse {
    id: number;
    First_Name: string;
    Last_Name: string;
    isSelected: boolean;
    created_at: string;
    updated_at: string;
}

export interface SignupResponse {
    statusCode: string;
    statusMessage: string;
    Result: SignupResult;
}

export interface SignupResult {
    id: number;
    Email: string;
}



export interface AddRoleResult {
    Name: string;
    updated_at: string;
    created_at: string;
    id: number;
}

export interface AddRoleResponse {
    statusCode: string;
    statusMessage: string;
    Result: AddRoleResult;
}

export interface GetEmployeeResult {
    id: number;
    User_ID: number;
    Branch_ID: number;
    Designation_ID: number;
    Manager_User_ID: number;
    Department_ID: number;
    Speciality: string;
    Skills: string;
    Graduation: string;
    Experience: number;
    Certificates: string;
    Social_Security_Number: number;
    Bank_Account_IBAN: number;
    Internal_Telephone_Extension: number;
    Marital_Status: string;
    Birth_place: string;
    Blood_Type: string;
    Emergency_Contact_Person: string;
    Emergency_Contact_Number: number;
    Driving_Licence: number;
    Natitonal_ID_Details: number;
    Family_Details: string;
    External_Company_ID: number;
    Date_of_Joining?: any;
    Date_of_Leaving?: any;
    Salary: number;
    Employee_Comission_Type: number;
    Comission_Rate: number;
    Employee_Tip_Type: number;
    created_at: string;
    updated_at: string;
}

export interface GetEmployeeResponse {
    statusCode: string;
    statusMessage: string;
    Result: GetAllEmployeeResult[];
}
///////////////////////////////

export interface EmployesData {
    id: number;
    User_ID: number;
    Branch_ID: number;
    Designation_ID: number;
    Manager_User_ID: number;
    Department_ID: number;
    Speciality: string;
    Skills: string;
    Graduation: string;
    Experience: number;
    Certificates: string;
    Social_Security_Number: number;
    Bank_Account_IBAN: number;
    Internal_Telephone_Extension: number;
    Marital_Status: string;
    Birth_place: string;
    Blood_Type: string;
    Emergency_Contact_Person: string;
    Emergency_Contact_Number: number;
    Driving_Licence: number;
    Natitonal_ID_Details: number;
    Family_Details: string;
    External_Company_ID: number;
    Date_of_Joining: string;
    Date_of_Leaving: string;
    Salary: number;
    Employee_Comission_Type: number;
    Comission_Rate: number;
    Employee_Tip_Type: number;
    created_at: string;
    updated_at: string;
}

export interface CertificatesData {
    id: number;
    employ_ID: number;
    certificate_URL: string;
    certificate_type: string;
    Certificate_Name: string;
    created_at: string;
    updated_at: string;
}

export interface GetAllEmployeeResult {
    employesData: EmployesData;
    CertificatesData: CertificatesData[];
}

export interface GetAllEmployeeResponse {
    statusCode: string;
    statusMessage: string;
    Result: GetAllEmployeeResult[];
}
///////////////////////////////


export interface getUserByBranchResult {
    id: number;
    company_ID: number;
    Branch_ID: number;
    Email: string;
    Password: string;
    First_Name: string;
    Last_Name: string;
    status: number;
    Role: number;
    token: string;
    created_at: string;
    updated_at: string;
}

export interface getUserByBranchResponse {
    statusCode: string;
    statusMessage: string;
    Result: getUserByBranchResult[];
}


export interface getUserByCompanyResult {
    id: number;
    User_ID: number;
    Branch_ID: number;
    Designation_ID: number;
    Manager_User_ID: number;
    Department_ID: number;
    Speciality: string;
    Skills: string;
    Graduation: number;
    Experience: number;
    Certificates: string;
    Social_Security_Number: number;
    Bank_Account_IBAN: number;
    Internal_Telephone_Extension: number;
    Marital_Status: number;
    Birth_place: string;
    Blood_Type: string;
    Emergency_Contact_Person: string;
    Emergency_Contact_Number: number;
    Driving_Licence: number;
    Natitonal_ID_Details: number;
    Family_Details: string;
    External_Company_ID: number;
    Date_of_Joining: string;
    Date_of_Leaving: string;
    Salary: number;
    Employee_Comission_Type: number;
    Comission_Rate: number;
    Employee_Tip_Type: number;
    created_at: string;
    updated_at: string;
}

export interface getUserByCompanyResponse {
    statusCode: string;
    statusMessage: string;
    Result: getUserByCompanyResult[];
}

export interface disblaeUserResult {
    id: number;
    company_ID: number;
    Branch_ID: number;
    Email: string;
    Password: string;
    First_Name: string;
    Last_Name: string;
    status: string;
    Role: number;
    token: string;
    UUID: string;
    Provider: string;
    Account_Status: number;
    created_at: string;
    updated_at: string;
}

export interface disblaeUserResponse {
    statusCode: string;
    statusMessage: string;
    Result: disblaeUserResult;
}




export interface getAllUsersResult {
    id: number;
    company_ID: number;
    Branch_ID: number;
    Email: string;
    Password: string;
    First_Name: string;
    Last_Name: string;
    status: number;
    Role: number;
    token: string;
    UUID: string;
    Provider: string;
    Account_Status: number;
    created_at: string;
    updated_at: string;
}

export interface getAllUsersResponse {
    statusCode: string;
    statusMessage: string;
    Result: getAllUsersResult[];
}

export interface Result {
    id: number;
    company_ID: number;
    Branch_Type: string;
    Name: string;
    Country: string;
    City: string;
    Town: string;
    Street: string;
    Number: string;
    Telephone: string;
    Location: string;
    Status: number;
    Contact_Person: number;
    Manager: string;
    Capabilities: string;
    Building_No: number;
    Landline_Number: string;
    Fax_Number: string;
    Branch_Email_address: string;
    Branch_Website: string;
    Branch_Social_Media_IDs: number;
    Branch_Data_Access_Permissions: string;
    Branch_Data_Sharing_Permissions: string;
    created_at: string;
    updated_at: string;
}

export interface BranchesAgainstCompanyResponse {
    statusCode: string;
    statusMessage: string;
    Result: Result[];
}

export interface Result {
    id: number;
    Department_Name: string;
    BranchID: number;
    CompanyID: number;
    created_at: string;
    updated_at: string;
}

export interface DepartmentAgainstBranchResponse {
    statusCode: string;
    statusMessage: string;
    Result: Result[];
}

export interface AllBranchesOfEmployeeResponse {
    statusCode: string;
    statusMessage: string;
    Result: BranchEmployeeResponse[];
}

export interface BranchEmployeeResponse {
    id: number;
    BranchID: number;
    EmployeeID: number;
    Employee_Name: string;
    alReadyUploaded: boolean;
    created_at: string;
    updated_at: string;
}
