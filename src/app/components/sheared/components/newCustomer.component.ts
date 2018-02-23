import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-customer',
  providers: [
    NgbActiveModal,
  ],
  template: `    
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <ng-content select=".app-modal-header"></ng-content>
            </div>
            <div class="modal-body">
              <ng-content select=".app-modal-body"></ng-content>
            </div>
            <div class="modal-footer">
              <ng-content select=".app-modal-footer"></ng-content>
            </div>
          </div>
        </div>
    `
})
export class NewCustomerComponent implements OnInit  {
  public visible = false;
  public visibleAnimate = false;
  private passData: any;
  ngOnInit(): void {
  }
  public show() {
    this.visible = true;
    alert('Yes');
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide() {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
