import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { INgxPrimengForm, INgxPrimengFormValidation, NgxPrimengFormService, NgxPrimengFormType } from 'projects/ngx-primeng-form/src/public-api';
import { IFormField } from '../../models/workflow-engine';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {

  systemFields: IFormField[] = [];
  customFields: IFormField[] = [];
  formItems: INgxPrimengForm[] = [];
  formAttributes: INgxPrimengForm[] = [];
  editableIndex = -1;

  @Input() control: FormControl;
  dynamicFormGroup: FormGroup;

  constructor(private service: NgxPrimengFormService,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.dynamicFormGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.prepareSystemFields();
    this.prepareCustomFields();
    this.prepareFields();
    this.loadFormAttributes();
  }

  private prepareSystemFields() {
    this.systemFields = [];
    this.systemFields.push({ key: 'propertyId', name: 'Property ID', property: { type: 'system' } });
    this.systemFields.push({ key: 'bankId', name: 'Bank ID', property: { type: 'system' } });
    this.systemFields.push({ key: 'leaseId', name: 'Lease ID', property: { type: 'system' } });
    this.systemFields.push({ key: 'incomeCategory', name: 'Income Category', property: { type: 'system' } });
  }

  private prepareCustomFields() {
    this.customFields = [];
    this.customFields.push({ key: 'text', name: 'Single Text', property: { type: 'custom', attributes: { cssStyle: 'form-control' } } });
    this.customFields.push({ key: 'textarea', name: 'Multiline Text', property: { type: 'custom', attributes: { cssStyle: 'form-control' } } });
    this.customFields.push({ key: 'date', name: 'Calendar', property: { type: 'custom', attributes: { cssStyle: '' } } });
    this.customFields.push({ key: 'select', name: 'Dropdown', property: { type: 'custom', attributes: { cssStyle: 'form-control' } } });
    this.customFields.push({ key: 'multiselect', name: 'MuliSelect', property: { type: 'custom', attributes: { cssStyle: 'd-block' } } });
  }

  private prepareFields() {
    const forms = this.control.value;
    if (forms) {
      this.formItems = this.service.jsonToForm(forms);
      this.service.prepareControl(this.dynamicFormGroup, this.formItems);
    }
  }

  onDragStart(field: IFormField, event: DragEvent) {
    event.dataTransfer.setData('field', JSON.stringify(field));
  }

  handleDrop(event: DragEvent) {
    const field = JSON.parse(event.dataTransfer.getData('field')) as IFormField;
    const existingControls = this.formItems;
    // create control instance
    const control = {} as INgxPrimengForm;
    // set label
    control.label = field.name;
    control.layoutStyleClass = 'col-md-6 col-xs-12';
    if (field.property.type === 'system') {
      control.controlName = field.key;
      control.type = NgxPrimengFormType.select;
      control.controlStyleClass = 'form-control';
    } else {
      // for custom
      control.controlName = `new_control_${new Date().getTime()}`;
      control.type = field.key as NgxPrimengFormType;
      control.controlStyleClass = field.property.attributes.cssStyle;
    }
    existingControls.push(control);
    this.formItems = this.service.jsonToForm(existingControls);
    this.service.prepareControl(this.dynamicFormGroup, this.formItems);
    // set form value
    this.control.setValue(this.formItems);
  }

  handleConfig(index: number) {
    this.editableIndex = -1;
    const timeout = setTimeout(() => {
      this.editableIndex = index;
    }, 500);
  }

  btnDelete(index: number) {
    this.formItems.splice(index, 1);
    this.service.prepareControl(this.dynamicFormGroup, this.formItems);
    this.editableIndex = -1;
  }

  private loadFormAttributes() {
    this.http.get<INgxPrimengForm[]>(`./assets/workflow/form-attribute.json`).subscribe(forms => {
      this.formAttributes = this.service.jsonToForm(forms);
    });
  }

  handleUpdate(value: any) {
    const instance = this.formItems[this.editableIndex];
    // update control name
    // instance.controlName = value.fieldName.replace(/[^a-zA-Z]+/g, '');
    instance.label = value.fieldName;
    instance.layoutStyleClass = value.layoutStyle;
    instance.placeholder = value.placeholder;
    instance.value = value.value;
    // set validation
    if (!instance.validation) {
      instance.validation = {} as INgxPrimengFormValidation;
    }
    instance.validation.required = value.validation.required;
    // set min length
    const minLength = value.validation.minLength;
    if (minLength) {
      instance.validation.minLength = parseInt(minLength, 10);
    }
    // set min length
    const maxLength = value.validation.maxLength;
    if (maxLength) {
      instance.validation.maxLength = parseInt(maxLength, 10);
    }

    this.service.prepareControl(this.dynamicFormGroup, this.formItems);
  }

  handleCancel() {
    this.editableIndex = -1;
  }

}
