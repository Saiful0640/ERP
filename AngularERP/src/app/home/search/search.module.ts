import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent],
  exports:[SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
    //NgModule
  ]
})
export class SearchModule { }
