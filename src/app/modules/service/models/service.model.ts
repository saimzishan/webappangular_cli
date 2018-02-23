export class ServiceModel {
id: number;
Company_ID: number;
service_CatID: number;
Service_Name: string = '';
Visibility: number;
Price: number;
Duration: string = '';
Padding_Time_Before: any = null;
Padding_Time_After: any = null;
Capacity: string = '';
Service_Providers: number;
Info: string = '';
Color: string = '';
Thumbnail:string;
Status:number;
Service_Commission_Type:string = '';
Service_Commission_Rate:number;
selected: string = '';
isSelected: boolean;
checkboxCheck = false;
}

export class BranchSertviceModel{
    id: number;
    BranchID: number;
    ServiceID: number[] = Array();
  }