export class DepartmentModel {
  id = -1;
  Department_Name: string = '';
  CompanyID: number;
  BranchID;
}

export class BranchDepartmentModel{
  id: number;
  BranchID: number;
  DepartmentID: number[] = Array();
}