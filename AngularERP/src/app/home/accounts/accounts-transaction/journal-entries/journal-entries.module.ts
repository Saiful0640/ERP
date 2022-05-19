import { LaddaModule } from 'angular2-ladda';
import { ReactiveFormsModule } from '@angular/forms';
import { DateControlComponent } from './../../../../shared/components/date-control/date-control.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntriesComponent } from './journal-entries.component';

@NgModule({
  declarations: [JournalEntriesComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  providers:[DateControlComponent],
  entryComponents:[DateControlComponent]
})
export class JournalEntriesModule { }
