import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { INgxPrimengForm, INgxPrimengFormValidation, NgxPrimengFormProperty, NgxPrimengFormService } from 'projects/ngx-primeng-form/src/public-api';

@Component({
  selector: 'app-dynamic-form-index',
  templateUrl: './dynamic-form-index.component.html',
  styleUrls: ['./dynamic-form-index.component.css']
})
export class DynamicFormIndexComponent implements OnInit {

  form: FormGroup;
  formItems: INgxPrimengForm[] = [];
  // store all dynamic form group
  dynamicFormGroup: FormGroup;
  // store dynamic form instance from JSON
  dynamicFormInstance: FormGroup;
  dynamicFormItems: INgxPrimengForm[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private service: NgxPrimengFormService) {
    // init form
    this.form = this.formBuilder.group({});
    this.dynamicFormInstance = this.formBuilder.group({});
    // init form builder
    this.dynamicFormGroup = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.loadDynamicForm();
  }

  private loadDynamicForm() {
    this.http.get<INgxPrimengForm[]>(`./assets/dynamic-form.json`).subscribe(forms => {
      this.dynamicFormItems = this.service.jsonToForm(forms);
      this.service.prepareControl(this.dynamicFormInstance, this.dynamicFormItems);
      // add new
      this.dynamicForms.push(this.prepareForm());
    });
  }

  private loadForms() {
    this.http.get<INgxPrimengForm[]>(`./assets/form.json`).subscribe(forms => {
      this.formItems = this.service.jsonToForm(forms);
      this.service.prepareControl(this.form, this.formItems);
    });
  }

  get dynamicForms(): FormArray {
    // tslint:disable-next-line: no-string-literal
    return this.dynamicFormGroup.controls['items'] as FormArray;
  }

  private prepareForm(): FormGroup {
    const formGroup = this.service.cloneAbstractControl(this.dynamicFormInstance);
    const validationFormGroup = formGroup.controls['validation'] as FormGroup;
    validationFormGroup.addControl('required', this.formBuilder.control(false));
    validationFormGroup.addControl('minLength', this.formBuilder.control(null));
    validationFormGroup.addControl('maxLength', this.formBuilder.control(null));
    validationFormGroup.addControl('regex', this.formBuilder.control(null));
    return formGroup;
  }

  btnAdd(index: number) {
    this.dynamicForms.insert(index + 1, this.prepareForm());
  }

  btnUpdate(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.prepareDyanmicForm();
    } else {
      this.fireValidation(formGroup);
    }
  }

  btnDelete(index: number) {
    if (this.dynamicForms.length > 1) {
      this.dynamicForms.removeAt(index);
    }
  }

  prepareDyanmicForm() {
    const formModels: INgxPrimengForm[] = [];
    this.dynamicForms.controls.forEach((formGroup: FormGroup) => {
      const model = {} as INgxPrimengForm;
      const controlName = formGroup.controls['fieldName'].value as string;
      // set control name
      model.controlName = controlName.replace(/[^a-zA-Z]+/g, '');
      // set type
      model.type = formGroup.controls['type'].value;
      // set label
      model.label = controlName;
      // set layout CSS class
      model.layoutStyleClass = formGroup.controls['layoutStyle'].value;
      //
      model.controlStyleClass = formGroup.controls['controlStyle'].value;
      // placeholder
      model.placeholder = formGroup.controls['placeholder'].value;
      // default value
      model.value = formGroup.controls['value'].value;
      // help text
      model.property = {} as NgxPrimengFormProperty;
      // set help text
      model.property.helpText = formGroup.controls['helpText'].value;
      // validation
      const validationFormGroup = formGroup.controls['validation'] as FormGroup;
      model.validation = {} as INgxPrimengFormValidation;
      // set required field
      model.validation.required = validationFormGroup.controls['required'].value;
      // set min length
      const minLength = validationFormGroup.controls['minLength'].value;
      if (minLength) {
        model.validation.minLength = parseInt(minLength, 10);
      }
      // set min length
      const maxLength = validationFormGroup.controls['maxLength'].value;
      if (maxLength) {
        model.validation.maxLength = parseInt(maxLength, 10);
      }
      // set regex
      const regular = validationFormGroup.controls['regex'].value;
      if (regular) {
        model.validation.regex = regular;
      }
      // set min max
      formModels.push(model);
    });
    this.formItems = this.service.jsonToForm(formModels);
    this.service.prepareControl(this.form, this.formItems);
  }

  private fireValidation(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.controls[controlName];
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity({ emitEvent: true });
    });
  }


  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.form.value));
    } else {
      this.fireValidation(this.form);
    }
  }

}
