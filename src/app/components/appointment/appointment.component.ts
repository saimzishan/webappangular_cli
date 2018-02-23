import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../modules/service/services/service.service';
import { UIService } from '../../modules/shared/services/ui.service';
import { CustomerService } from '../../modules/customer/services/customer.service';
declare var $: any;

@Component({
    selector: 'appointment',
    templateUrl: '../appointment/appointment.component.html'
})

export class AppointmentComponent implements OnInit {
    public checkOpen = 1;
    public appiontmentData = new AppiontmetntData();
    allServices;
    allServicesCategory;
    allEmployee;
    constructor( private employeeService:CustomerService, private uiService: UIService, private servicesService: ServiceService) {}
    ngOnInit(): void {
        this.readCategoryList();
        this.getAllSpecialist();
    }
    readCategoryList() {
        this.servicesService.readCategoryList().subscribe(data => {
            if (data.statusCode == "1") {
                this.allServicesCategory = data.Result;
                // console.log(this.allServicesCategory);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );
    }
    onChange(id){
        // alert(id);
        this.getServicesOfCategory(id);
    }
    getServicesOfCategory(id) {
        this.allServices = [];
        this.servicesService.getServicesOfCategory(id).subscribe(data => {
            if (data.statusCode == "1") {
                this.allServices = data.Result;
                 // console.log(this.allServices);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );
    }
    getAllSpecialist() {
        this.employeeService.getAllSpecialist().subscribe(data => {
            if (data.statusCode == "1") {
                this.allEmployee = data.Result;
                // console.log(this.allEmployee);
            }
            else {
                this.uiService.alertError(data.statusMessage);
            }
        }
        );
    }
    nextClick(check): void {
        if (check === 2) {
            $('#dvStep1Data').hide(800);
            $('#dvStep2Data').show(800);
            $('#btnBack').show();
            $('#divStep2').width('100%');
            this.checkOpen = check;
        } else if (check === 3) {
            $('#dvStep2Data').hide(800);
            $('#dvStep3Data').show(800);
            $('#divStep3').width('100%');
          this.checkOpen = check;
        } else if (check === 4) {
          $('#dvStep2Data').hide(800);
          $('#dvStep3Data').hide(800);
          $('#dvStep5Data').show(800);
          $('#divStep5').width('100%');
          $('#btnNext').hide();
          $('#btnBooking').show();
          this.checkOpen = check;
        } else if (!$('#dvStep4Data').is(':visible')) {
          this.checkOpen = check;

        }
    }

    backClick(check): void {
      if (check === 4) {
        $('#dvStep5Data').hide(800);
        $('#dvStep3Data').show(800);
        $('#divStep5').width('0');
        $('#btnNext').show();
        $('#btnBack').show();
        $('#bttnBack').hide();
        $('#btnBooking').hide();
        this.checkOpen--;
      } else if (check === 3) {
          $('#dvStep3Data').is(':visible')
            $('#dvStep3Data').hide(800);
            $('#dvStep2Data').show(800);
            $('#divStep3').width('0');
            $('#btnNext').show();
            $('#btnBooking').hide();
        this.checkOpen--;
        } else if (check === 2) {
          $('#dvStep2Data').is(':visible')
            $('#dvStep2Data').hide(800);
            $('#dvStep1Data').show(800);
            $('#btnBack').hide();
            $('#divStep2').width('0');
        this.checkOpen--;
        }
    }

    bookingClick(): void {
        $('#dvStep3Data').hide(800);
        $('#dvStep5Data').hide(800);
        $('#dvStep4Data').show(800);
        $('#divStep4').width('100%');
        $('#btnNext').hide();
        $('#btnBack').hide();
        $('#bttnBack').hide();
        $('#btnBooking').hide();
    }
}
export class AppiontmetntData {
  Category = '';
  Service = '';
  Employee = '';
  txtAvailable = new Date().toISOString().substring(0, 10);
  ddlStart = '';
  ddlFinish = '';
  txtName = '';
  txtPhone = '';
  txtEmail = '';
  txtNotes = '';
  paymentMethod = '';
  mettingTime = '';
}

