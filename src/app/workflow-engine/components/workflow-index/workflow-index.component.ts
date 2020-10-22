import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, SelectItem } from 'primeng';
import { INgxPrimengForm, NgxPrimengFormSelectProperty, NgxPrimengFormService } from 'projects/ngx-primeng-form/src/public-api';
import { CodeViewComponent } from '../code-view/code-view.component';
import { WorkflowPreviewComponent } from '../workflow-preview/workflow-preview.component';

@Component({
  selector: 'app-workflow-index',
  templateUrl: './workflow-index.component.html',
  styleUrls: ['./workflow-index.component.css']
})
export class WorkflowIndexComponent implements OnInit {

  form: FormGroup;
  stageInfoFormItems: INgxPrimengForm[] = [];
  private stageInfoFormGroup: FormGroup;

  activeStageIndex = -1;

  // tabs
  tabs: KeyValue<string, string>[] = [
    { key: 'info', value: 'Info' },
    { key: 'checklist', value: 'Check Lists' },
    { key: 'form', value: 'Form' }
  ];
  activeTab = 'info';

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private service: NgxPrimengFormService,
    private dialog: DialogService) {
    this.form = formBuilder.group({
      formName: formBuilder.control(null, [Validators.required]),
      stages: formBuilder.array([])
    });
    this.stageInfoFormGroup = this.formBuilder.group({});
  }

  ngOnInit() {
    this.loadStageBasicForms();
  }

  handleAddStage() {

    const nextStageNo = this.stageForms.length + 1;
    this.stageForms.push(this.getStageForm(`New Stage ${nextStageNo}`, nextStageNo));
    this.setActiveStage(this.stageForms.length - 1);
    this.prepareReworkStage();

  }

  private getStageForm(stageName: string, stageNumber: number): FormGroup {
    // clone the form group
    const formGroup = this.formBuilder.group({
      info: this.service.cloneAbstractControl(this.stageInfoFormGroup),
      checklist: this.formBuilder.array([]),
      form: this.formBuilder.control(null)
    });
    const infoFormGroup = formGroup.controls['info'] as FormGroup;
    // set the value
    infoFormGroup.controls['stageName'].setValue(stageName);
    infoFormGroup.controls['stageNumber'].setValue(stageNumber);
    return formGroup;
  }

  get stageForms(): FormArray {
    return this.form.controls.stages as FormArray;
  }

  handleStageClick(stageIndex: number) {
    this.setActiveStage(stageIndex);
  }

  private setActiveStage(stageIndex: number) {
    this.activeTab = 'info';
    // set the active stage number
    this.activeStageIndex = stageIndex;
  }

  private prepareReworkStage() {
    const reworkStages: SelectItem[] = [];
    const total = this.stageForms.length;
    for (let i = 1; i <= total; i++) {
      reworkStages.push({ value: i, label: `Stage# ${i}` });
    }
    const reworkControl = this.service.getProperty('reworkTo', this.stageInfoFormItems) as NgxPrimengFormSelectProperty;
    reworkControl.options = reworkStages;
  }

  private loadStageBasicForms() {
    this.http.get<INgxPrimengForm[]>(`./assets/workflow/stage-form.json`).subscribe(forms => {
      this.stageInfoFormItems = this.service.jsonToForm(forms);
      this.service.prepareControl(this.stageInfoFormGroup, this.stageInfoFormItems);

      // this.handleAddStage();
    });
  }

  showCode() {
    this.dialog.open(CodeViewComponent, {
      header: 'JSON',
      width: '50%',
      data: this.form.value
    });
  }

  getActiveStageFormGroup(controlName: string): AbstractControl {
    const formGroup = this.stageForms.controls[this.activeStageIndex] as FormGroup;
    return formGroup.controls[controlName];
  }

  handleDelete() {
    this.activeStageIndex = -1;
    this.stageForms.removeAt(this.activeStageIndex);
  }

  preview() {
    this.dialog.open(WorkflowPreviewComponent, {
      header: 'Preview',
      width: '80%',
      data: this.form.value
    });
  }

}
