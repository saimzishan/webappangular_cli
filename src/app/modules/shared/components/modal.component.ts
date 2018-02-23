import {Component, Input, ViewChild} from '@angular/core';
import {zipStatic} from 'rxjs/operators/zip';
import { PartialBranchComponent } from '../../branch/components/partial-branch.component';


@Component({
    selector: 'app-modal',
    template: `
    <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
         [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
      <div class="modal-dialog" [ngStyle]="{'width': customWidth + '%'}">
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
    </div>
    `,
  styles: [`
  `]
  })
  export class ModalComponent {
    @Input() customWidth;
    public visible = false;
    public visibleAnimate = false;
    private passData: any;
    public show(data: any): void {
      this.visible = true;
      this.passData = data;
     /* data.backdrop: 'static';
      data.keyboard = false;*/
     // data.backdrop = false;
     //  console.log(data);
      setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
      this.visibleAnimate = false;
      setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
      if ((<HTMLElement>event.target).classList.contains('modal')) {
        //this.hide();
      }
    }
  }
