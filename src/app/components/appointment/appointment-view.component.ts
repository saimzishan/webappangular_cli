import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent,  CalendarEventAction,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Popover} from 'ng2-popover';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

interface Film {
    id: number;
    title: string;
    release_date: string;
}

@Component({
    selector: 'appointment-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../appointment/appointment-view.component.html',
    styles: [`
      .show-Emplyee-form-style{
        height: 64%;
      }
    `
    ]
})


export class AppointmentViewComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';
  userForm: any;
  viewDate: Date = new Date();
  private modalData: { event: CalendarEvent; action: string };
    constructor( private modalService: NgbModal) {
      this.userForm = new  FormGroup({
        provider: new FormControl('', [Validators.required ]),
        service: new FormControl('', [Validators.required] )
      });
    }
    activeDayIsOpen: boolean;
    sndEvent: any = false;
  //
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    }
  ];

    events: CalendarEvent[] = [
        {
            start: new Date(),
            title: 'An event',
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            }
        }, {
          start: new Date( new Date(2017, 11, 1 ) ),
          title: 'An event',
          color: {
            primary: '#000',
            secondary: '#FAE3E3'
          }
      }
    ];
  ngOnInit(): void { }
  //
  onSubmit() {
    // validations
    if (this.userForm.untouched || this.userForm.invalid) {
      alert('Validation Error please fill the form properly');
      return;
    }
  }
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
              // to close area
                this.activeDayIsOpen = false;
                this.sndEvent = false;
            } else {
                this.sndEvent = events;
            }
        }
    }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.openModel( );
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

}
