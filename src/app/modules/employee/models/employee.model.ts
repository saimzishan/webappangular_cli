export class EmployeeModel {
  strFirstName: string;
  strLastName: string;
  strEmail: string;
  Role_ID: number;
  Company_ID: number;
  Branch_ID: number;
  User_ID : number;
  EmployeeID: number;
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
  Certificate_Name: string;
  tempCertificate: string;
  ext: string;
  userTokenOfEmployee: string;
}

export class BranchEmployeeModel{
  id: number;
  BranchID: number;
  employ_ID: number[] = Array();
}
