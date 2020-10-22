import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowEngineRoutingModule } from './workflow-engine-routing.module';
import { WorkflowIndexComponent } from './components/workflow-index/workflow-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrimengFormModule } from 'projects/ngx-primeng-form/src/public-api';
import { CheckListComponent } from './components/check-list/check-list.component';
import { CodeViewComponent } from './components/code-view/code-view.component';
import { CheckboxModule, DialogModule, DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng';
import { AccordionModule } from 'primeng/accordion';
import { DragDropModule } from 'primeng/dragdrop';
import { StageFormComponent } from './components/stage-form/stage-form.component';
import { FormPropertyComponent } from './components/form-property/form-property.component';
import { WorkflowPreviewComponent } from './components/workflow-preview/workflow-preview.component';


@NgModule({
  declarations: [WorkflowIndexComponent, CheckListComponent, CodeViewComponent, StageFormComponent, FormPropertyComponent, WorkflowPreviewComponent],
  entryComponents: [CodeViewComponent, WorkflowPreviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrimengFormModule,
    DialogModule,
    AccordionModule,
    DynamicDialogModule,
    DragDropModule,
    CheckboxModule,
    WorkflowEngineRoutingModule
  ],
  providers: [DialogService,
    DynamicDialogRef,
    DynamicDialogConfig]
})
export class WorkflowEngineModule { }
