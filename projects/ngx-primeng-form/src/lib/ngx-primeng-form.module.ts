import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';

import { NgxPrimengFormComponent } from './components/ngx-primeng-form.component';



@NgModule({
  declarations: [NgxPrimengFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    AutoCompleteModule
  ],
  exports: [NgxPrimengFormComponent]
})
export class NgxPrimengFormModule { }
