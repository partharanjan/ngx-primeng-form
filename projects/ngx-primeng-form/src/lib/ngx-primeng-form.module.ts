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
import { FormControlLayoutComponent } from './components/form-control-layout/form-control-layout.component';
import { InlineFormValidationComponent } from './components/inline-form-validation/inline-form-validation.component';

const components = [
  NgxPrimengFormComponent,
  FormControlLayoutComponent,
  InlineFormValidationComponent
];

@NgModule({
  declarations: [...components],
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
  exports: [...components]
})
export class NgxPrimengFormModule { }
