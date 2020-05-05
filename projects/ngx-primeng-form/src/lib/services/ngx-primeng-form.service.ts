import { Injectable } from '@angular/core';
import { NgxPrimengFormType, NgxPrimengForm, NgxPrimengFormProperty, NgxPrimengFormSelectProperty, NgxPrimengFormRadioProperty, NgxPrimengFormDateProperty, NgxPrimengFormCheckboxProperty, NgxPrimengFormAutoCompleteProperty, NgxPrimengFormValidation } from '../interfaces/ngx-primeng-form';
import { FormGroup, FormControl, Validator, Validators, ValidatorFn } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';

@Injectable({
  providedIn: 'root'
})
export class NgxPrimengFormService {

  constructor() { }

  create(controlName: string, label: string, id: string, type: NgxPrimengFormType, value: any, placeholder: string, controlCssClass: string, layoutCssClass: string, validation: NgxPrimengFormValidation): NgxPrimengForm {
    return {
      controlName,
      label,
      id,
      value,
      controlStyleClass: controlCssClass,
      layoutStyleClass: layoutCssClass,
      type,
      placeholder,
      property: this.getPropertyType(type),
      validation
    }
  }

  private getPropertyType(type: NgxPrimengFormType): NgxPrimengFormProperty {
    switch (type) {
      case NgxPrimengFormType.autocomplete: { return new NgxPrimengFormAutoCompleteProperty(); }
      case NgxPrimengFormType.checkbox: { return new NgxPrimengFormCheckboxProperty(); }
      case NgxPrimengFormType.date: { return new NgxPrimengFormDateProperty(); }
      case NgxPrimengFormType.multiselect: { return new NgxPrimengFormSelectProperty(); }
      case NgxPrimengFormType.radio: { return new NgxPrimengFormRadioProperty(); }
      case NgxPrimengFormType.select: { return new NgxPrimengFormSelectProperty(); }
      case NgxPrimengFormType.text: { return new NgxPrimengFormProperty(); }
      case NgxPrimengFormType.textarea: { return new NgxPrimengFormProperty(); }
      default: { return new NgxPrimengFormProperty() }
    }
  }

  getProperty<T extends NgxPrimengFormProperty>(controlName: string, forms: NgxPrimengForm[]): T {
    if (forms && forms.length > 0) {
      const item = forms.find(m => m.controlName.toLowerCase() == controlName.toLowerCase());
      if (item != null) {
        return item.property as T;
      }
    }
    return null
  }

  // json object to form object
  jsonToForm(jsonForms: NgxPrimengForm[]): NgxPrimengForm[] {
    const results: NgxPrimengForm[] = []
    if (jsonForms && jsonForms.length > 0) {
      jsonForms.forEach(form => {
        // prepare the form
        const formObj = this.create(
          form.controlName,
          form.label ? form.label : '',
          form.id ? form.id : form.controlName,
          form.type ? form.type : NgxPrimengFormType.text,
          form.value ? form.value : null,
          form.placeholder ? form.placeholder : '',
          form.controlStyleClass ? form.controlStyleClass : '',
          form.layoutStyleClass ? form.layoutStyleClass : '',
          form.validation ? form.validation : null);
        results.push(formObj);
      });
    }
    return results;
  }

  prepareControl(formGroup: FormGroup, forms: NgxPrimengForm[]) {
    // clear the form gropup
    Object.keys(formGroup.controls).forEach(controlName => {
      formGroup.removeControl(controlName);
    })

    // set the form group value
    if (forms && forms.length > 0) {
      forms.forEach(form => {
        const validations = this.getValidations(form.validation);
        formGroup.addControl(form.controlName, new FormControl(form.value, validations));
      });
    }
  }

  getValidations(validation: NgxPrimengFormValidation): ValidatorFn[] {
    const results: ValidatorFn[] = [];
    if (validation) {
      // required
      if (validation.required) {
        results.push(Validators.required);
      }
      // email
      if (validation.email) {
        results.push(Validators.email);
      }
      // min length
      if (validation.minLength && validation.minLength > 0) {
        results.push(Validators.minLength(validation.minLength));
      }
      // max length
      if (validation.maxLength && validation.maxLength > 0) {
        results.push(Validators.maxLength(validation.maxLength));
      }
      // min
      if (validation.min && validation.min > 0) {
        results.push(Validators.min(validation.min));
      }
      // max
      if (validation.max && validation.max > 0) {
        results.push(Validators.max(validation.max));
      }
      // regex
      if (validation.regex) {
        results.push(Validators.pattern(validation.regex));
      }
    }
    return results;
  }

  setSelectItems(forms: NgxPrimengForm[], controlName: string, items: SelectItem[]) {
    const property = this.getProperty(controlName, forms) as NgxPrimengFormSelectProperty;
    if (property) {
      property.options = items;
    }
  }

}
