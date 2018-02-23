import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NewCustomerComponent} from '../../sheared/components/newCustomer.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModelFormComponent implements OnInit {
  closeResult: string;

  constructor( private modalService: NgbModal ) { }

  ngOnInit() {
  }
  show() {
    this.modalService.open(NewCustomerComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
