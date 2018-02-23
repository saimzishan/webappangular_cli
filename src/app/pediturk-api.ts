var apiUrl = 'http://backoffice.istanbul/api';

export class PediturkApi {

  public static signupUrl: string = apiUrl + '/users/signup';
  public static signinUrl: string = apiUrl + '/users/doLogin';
  public static changePassword: string = apiUrl + '/users/user/';
  public static getUserByID: string = apiUrl + '/users/user/';
  public static forgotPassword: string = apiUrl + '/users/ForgotPassWord';

  public static addCompany: string = apiUrl + '/companies/company';
  public static updateCompany: string = apiUrl + '/companies/company/';
  public static getAllCompanies: string = apiUrl + '/companies/showAllCompanies';
  public static getOrDeleteByIdCompany: string = apiUrl + '/companies/company/';
  public static uploadCompanyLogo: string = apiUrl + '/companies/uploadlogo/';

  public static addBranch: string = apiUrl + '/branches/branch';
  public static getAllBranches: string = apiUrl + '/branches/showAllBranches';
  public static getOrDeleteByIdBranch: string = apiUrl + '/branches/branch/';
  public static updateBranch: string = apiUrl + '/branches/branch/';
  public static branchesAgainstCompanyId: string = apiUrl + '/branches/getBranches_Against_Cmp_ID'
  public static getAllBranchesAgainstCompanyID: string = apiUrl + '/branches/getBranches_Against_Emp_ID';
  public static addDepartmentToBranchURL: string = apiUrl + '/branch/department';  
  public static getAllDepartmentOfBranchURL: string = apiUrl + '/branch/showAllBranchDepartments';


  public static addRole: string = apiUrl + '/roles/role';
  public static getOrDeleteByIdRole: string = apiUrl + '/roles/role/';
  public static getAllRoles: string = apiUrl + '/roles/showAllRoles';
  public static updateRole: string = apiUrl + '/roles/role/';


  public static addDepartment: string = apiUrl + '/Departments/Department';
  public static getAllDepartment: string = apiUrl + '/Departments/showAllDepartments';
  public static getOrDeleteByIdDepartment: string = apiUrl + '/Departments/Department/';
  public static getDepartmentAgainstBranchId: string = apiUrl + '/Departments/getDepartments_Against_Branch_ID';
  public static getAllDepartmentsAgainstCompanyID: string = apiUrl + '/Departments/getDepartments_Against_Emp_ID';
  public static getBranchDepartments_Against_Branch_ID: string = apiUrl + '/branch/getBranchDepartments_Against_Branch_ID';

  public static updateDepartment: string = apiUrl + '/Departments/Department/';

  public static addService: string = apiUrl + '/services/service';
  public static getAllServices: string = apiUrl + '/services/showAllServices';
  public static getOrDeleteByIdService: string = apiUrl + '/services/service/';
  public static getByIdService: string = apiUrl + '/services/service/';
  public static updateService: string = apiUrl + '/services/service/';
  public static uploadThumbnail: string = apiUrl + '/services/uploadThumbnail/';

  public static getAllServicesAgainstCompanyID: string = apiUrl + '/services/serviceAgainstCmpID';
  public static getServicesOfCategory: string = apiUrl + '/services/searchByserviceCatID';

  public static addServiceCategory: string = apiUrl + '/service/category';
  public static updateServiceCategory: string = apiUrl + '/service/category/';
  public static deleteServiceCategory: string = apiUrl + '/service/category/';
  public static getServiceCategories: string = apiUrl + '/service/showAllServiceCategories';
  public static getServiceCategoriesOfCompany: string = apiUrl + '/service/getServicecat_Against_Cmp_ID';

  public static addEmployee: string = apiUrl + '/employes/employ';
  public static uploadCertificate: string = apiUrl + '/certificates/certificate';
  public static deleteCertificate: string = apiUrl + '/certificates/certificate/';
  public static CertificatesAgainstEmpID: string = apiUrl + '/certificates/CertificatesAgainstEmpID';
  public static getAllEmployee: string = apiUrl + '/employes/showAllEmpoyes';
  public static getEmployeesAgainstCompany: string = apiUrl + '/employes/getEmployesAndUser_Against_Cmp_ID';
  public static getOrDeleteByIdEmployee: string = apiUrl + '/employes/employ/';
  public static getUsersAgainstBranchID: string = apiUrl + '/users/getUserAgainstBranch';
  public static getUsersAgainstCompanyID: string = apiUrl + '/users/getUserAgainstCompanyID';
  public static getOrDeleteByIdUser: string = apiUrl + '/users/user/';
  public static changeStatus: string = apiUrl + '/users/change_Status/';
  public static updateUser: string = apiUrl + '/users/user/';
  public static updateEmplayee: string = apiUrl + '/employes/employ/';
  public static deleteEmplayee: string = apiUrl + '/employes/employ/';
  public static getEmployesAgainstUserID: string = apiUrl + '/employes/getEmployesAgainstUserID';
  public static getAllUsers: string = apiUrl + '/users/getAllUsers';
  public static getSingleEmpData: string = apiUrl + '/employes/employ/';
  public static getEmployesServices_Against_Emp_ID: string = apiUrl + '/company/getEmployesServices_Against_Emp_ID';
  public static showAllBranchAndServices: string = apiUrl + '/branch/showAllBranchAndServices';
  public static createServiceToBranch: string = apiUrl + '/branch/service';
  public static showAllBranchAndEmployees: string = apiUrl + '/branch/showAllBranchEmployes';
  public static createNewCustomer: string = apiUrl + '/customers/customer';
  public static updateCustomer: string = apiUrl + '/customers/customer/';
  public static deleteCustomer: string = apiUrl + '/customers/customer/';
  public static getAllCustomers: string = apiUrl + '/customers/showAllCustomers';
  public static getSingleCustomerDetails: string = apiUrl + '/customers/customer/';
  public static getAllSpecialist: string = apiUrl + '/users/getAllSpecialist';
  public static showAllUsers: string = apiUrl + '/users/showAllUsers';
  public static addDocTiming: string = apiUrl + '/doctor/timing';
  public static getDoctorTimings_Against_UserID: string = apiUrl + '/doctor/getDoctorTimings_Against_UserID';

  /// appointment
  public static submitAppiontment: string = apiUrl + '/appointments/appointment';
  public static getAllAppiontment: string = apiUrl + '/appointments/showAllAppointments';
}
