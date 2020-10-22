import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormIndexComponent } from './components/dynamic-form-index/dynamic-form-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrimengFormModule } from 'projects/ngx-primeng-form/src/public-api';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [DynamicFormIndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    NgxPrimengFormModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule { }
