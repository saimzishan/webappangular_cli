export class BranchModel {
    Branch_Type: string = '';
    Name: string = '';

    Country: string = '';
    City: string = '';
    Town: string = '';
    Street: string = '';
    Building_No: number = 0;
    Location: string = '';
    SocialMediaLinks = [];
    Contact_Person: string = '';
    Telephone: number;
    branch_Admin_Email: string = '';
    Admin_Password: string = '';
    confirmPassword: string = '';
    Number: string;
    //this landline is extranew
    Landline_Number: string;
    departments = [];
    services = [];
    Fax_Number: string;
    Branch_Email_address: string;
    Branch_Website: string = '';
    selected: string;
    Branch_Social_Media_IDs: string = '';
    Status: number;
    Manager: string = '';
    Capabilities: string;
    Branch_Data_Access_Permissions: string = '';
    Branch_Data_Sharing_Permissions: string = '';
    branchDepartments = [];
    branchServices = [];
    newTabIndex = 0;
    id: number = -1;
    company_ID: number;
    DepartmentID =  [];
    serviceID = [];
  }
