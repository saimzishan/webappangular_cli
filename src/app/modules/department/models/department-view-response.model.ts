export interface DepartmentViewResponse {
    id: number;
    Department_Name: string;
    BranchID: number;
    CompanyID: number;
    selected: string;
    isSelected: boolean;
}

export interface BranchDepartmentResponse {
    id: number;
    BranchID: number;
    DepartmentID: number;
    Department_Name: string;
    alReadyUploaded: boolean;
    created_at: string;
    updated_at: string;
}