import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-control',
  template: `<ngb-timepicker [(ngModel)]="ngbTime" name="ngbTime" (ngModelChange)="onSelectTime()" [seconds]="true" [secondStep]="10" [meridian]="false"></ngb-timepicker>`,
  styleUrls: []
})
export class TimeControlComponent implements OnInit {

  @Output() getTimeString = new EventEmitter<string>();
  @Output() getTimeObj = new EventEmitter<NgbTimeStruct>();

  @Input() ngbTime:NgbTimeStruct;
  constructor(
  ) { }
  ngOnInit() {
  }

  onSelectTime(){
    if(this.ngbTime==null){return;}
    let time = this.ngbTime;
    let hhmmss = time.hour+':'+time.minute+':'+time.second;
    this.getTimeString.emit(hhmmss);
    this.getTimeObj.emit(time);
  }
}