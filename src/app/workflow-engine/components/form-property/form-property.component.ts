import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { INgxPrimengForm, NgxPrimengFormService } from 'projects/ngx-primeng-form/src/public-api';

@Component({
  selector: 'app-form-property',
  templateUrl: './form-property.component.html',
  styleUrls: ['./form-property.component.css']
})
export class FormPropertyComponent implements OnInit {

  formItems: INgxPrimengForm[] = [];
  form: FormGroup;

  @Input() instance: INgxPrimengForm;
  @Input() attributes: INgxPrimengForm[];

  @Output() onUpdate = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private service: NgxPrimengFormService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.service.prepareControl(this.form, this.attributes);
    const validationFormGroup = this.form.controls['validation'] as FormGroup;
    validationFormGroup.addControl('required', this.formBuilder.control(false));
    validationFormGroup.addControl('minLength', this.formBuilder.control(null));
    validationFormGroup.addControl('maxLength', this.formBuilder.control(null));
    validationFormGroup.addControl('regex', this.formBuilder.control(null));
    // set the value
    this.form.controls['fieldName'].setValue(this.instance.label);
    this.form.controls['layoutStyle'].setValue(this.instance.layoutStyleClass);
    this.form.controls['placeholder'].setValue(this.instance.placeholder);
    this.form.controls['value'].setValue(this.instance.value);
  }

  handleUpdate() {
    this.onUpdate.emit(this.form.value);
  }

  handleCancel() {
    this.onCancel.emit();
  }

  getValidationRequiredControl(): AbstractControl {
    const formGroup = this.form.controls['validation'] as FormGroup;
    return formGroup.controls['required'];
  }

}
