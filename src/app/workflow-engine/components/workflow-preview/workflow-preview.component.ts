import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng';
import { INgxPrimengForm, NgxPrimengFormService } from 'projects/ngx-primeng-form/src/public-api';

@Component({
  selector: 'app-workflow-preview',
  templateUrl: './workflow-preview.component.html',
  styleUrls: ['./workflow-preview.component.scss']
})
export class WorkflowPreviewComponent implements OnInit {

  stages: any[];
  activeStage: any;
  formItems: INgxPrimengForm[] = [];
  form: FormGroup;

  code: any;
  constructor(private dialogConfig: DynamicDialogConfig, formBuilder: FormBuilder, private service: NgxPrimengFormService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.code = this.dialogConfig.data;
    this.stages = this.code.stages;
    this.activeStage = this.stages[0];
    this.formItems = this.service.jsonToForm(this.activeStage.form);
    this.service.prepareControl(this.form, this.formItems);
  }

}
